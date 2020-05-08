/*
 * EMS-ESP - https://github.com/proddy/EMS-ESP
 * Copyright 2019  Paul Derbyshire
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include "console.h"
#include "emsesp.h"

namespace emsesp {

static std::shared_ptr<Commands>    commands = std::make_shared<Commands>();
static std::shared_ptr<EMSESPShell> shell;

std::vector<bool> EMSESPStreamConsole::ptys_;

#ifndef EMSESP_STANDALONE
uuid::telnet::TelnetService telnet_([](Stream & stream, const IPAddress & addr, uint16_t port) -> std::shared_ptr<uuid::console::Shell> {
    return std::make_shared<EMSESPStreamConsole>(stream, addr, port);
});
#endif

std::shared_ptr<Commands> EMSESPShell::commands = [] {
    std::shared_ptr<Commands> commands = std::make_shared<Commands>();
    return commands;
}();

EMSESPShell::EMSESPShell()
    : Shell() {
}

void EMSESPShell::started() {
    logger().log(LogLevel::INFO, LogFacility::CONSOLE, F("User session opened on console %s"), console_name().c_str());
}

void EMSESPShell::stopped() {
    if (has_flags(CommandFlags::ADMIN)) {
        logger().log(LogLevel::INFO, LogFacility::AUTH, F("Admin session closed on console %s"), console_name().c_str());
    }
    logger().log(LogLevel::INFO, LogFacility::CONSOLE, F("User session closed on console %s"), console_name().c_str());
}

// show welcome banner
void EMSESPShell::display_banner() {
    Settings settings;

    println();
    printfln(F("┌──────────────────────────────────────────┐"));
    printfln(F("│ %sEMS-ESP version %-10s%s               │"), COLOR_BOLD_ON, settings.app_version().c_str(), COLOR_BOLD_OFF);
    printfln(F("│ %s%shttps://github.com/proddy/EMS-ESP%s        │"), COLOR_BRIGHT_GREEN, COLOR_UNDERLINE, COLOR_RESET);
    printfln(F("│                                          │"));

    if (System::safe_mode()) {
        printfln(F("│ %sIN SAFE MODE. EMS BUS IS DISABLED.%s       │"), COLOR_BRIGHT_RED_BACKGROUND, COLOR_RESET);
#ifdef EMSESP_SAFE_MODE
        printfln(F("│ %s!FORCED AT COMPILE TIME!%s                 │"), COLOR_BRIGHT_RED, COLOR_RESET);
#endif
        printfln(F("│                                          │"));
    }

    printfln(F("│ type %shelp%s to show available commands     │"), COLOR_UNDERLINE, COLOR_RESET);
    printfln(F("└──────────────────────────────────────────┘"));
    println();

    // load the list of commands
    add_console_commands();
}

// pre-loads all the console commands into the MAIN context
// This is only done after a connection is established, to save on Heap memory
void EMSESPShell::add_console_commands() {
    // if we already have these commands loaded, stop adding duplicates
    // for example when opening multiple serial/telnet sessions
    if (_console_commands_loaded) {
        return;
    }

    commands->remove_context_commands(ShellContext::MAIN); // just in case, remove everything

    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(refresh)},
                          [&](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              shell.printfln(F("Refreshing console and fetching device data"));
                              _console_commands_loaded = false;
                              add_console_commands();
                              EMSESP::fetch_all_values();
                          });

    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(show), F_(version)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              shell.printfln(F("%s%sEMS-ESP version %s%s"), COLOR_BRIGHT_GREEN, COLOR_BOLD_ON, Settings().app_version().c_str(), COLOR_RESET);
                              shell.println();
                          });

    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(show)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              //   shell.printfln(F("%s%sEMS-ESP version %s%s"), COLOR_BRIGHT_GREEN, COLOR_BOLD_ON, Settings().app_version().c_str(), COLOR_RESET);
                              //   shell.println();
                              //   EMSESP::show_emsbus(shell);
                              //   EMSESP::show_devices(shell);
                              EMSESP::show_values(shell);
                          });

    /*
     * add the submenus...
     */

    // MQTT
    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(mqtt)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              dynamic_cast<EMSESPShell &>(shell).enter_custom_context(ShellContext::MQTT);
                              Mqtt::console_commands();
                          });

    // EMS
    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(ems)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              dynamic_cast<EMSESPShell &>(shell).enter_custom_context(ShellContext::EMS);
                              EMSESP::console_commands();
                          });

    // System
    commands->add_command(ShellContext::MAIN,
                          CommandFlags::USER,
                          flash_string_vector{F_(system)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              dynamic_cast<EMSESPShell &>(shell).enter_custom_context(ShellContext::SYSTEM);
                              System::console_commands();
                          });

    // add all the context menus for the connected devices
    // this assumes they have been loaded
    EMSESP::add_context_menu();

    enter_custom_context(ShellContext::MAIN); // add su, exit and help

    _console_commands_loaded = true;
}

std::string EMSESPShell::hostname_text() {
    Settings    settings;
    std::string hostname = settings.hostname();

    if (hostname.empty()) {
        hostname.resize(16, '\0');

#if defined(ESP8266)
        snprintf_P(&hostname[0], hostname.capacity() + 1, PSTR("esp8266"));
#else
        snprintf_P(&hostname[0], hostname.capacity() + 1, PSTR("esp32"));
#endif
    }

    /*
    if (System::safe_mode()) {
        return std::string{"safemode@"} + hostname;
    }
    */

    return hostname;
}

// remove commands from the current context to save memory before exiting
bool EMSESPShell::exit_context() {
    unsigned int current_context = context();
    commands->remove_context_commands(current_context);

    if (current_context == ShellContext::MAIN) {
        Shell::stop();
        return true;
    }
    return Shell::exit_context();
}

// each custom context has the common commands like log, help, exit, su etc
void EMSESPShell::enter_custom_context(unsigned int context) {
#ifdef EMSESP_DEBUG
    commands->add_command(context,
                          CommandFlags::ADMIN,
                          flash_string_vector{F_(test)},
                          flash_string_vector{F_(name_mandatory)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) { EMSESP::run_test(shell, arguments.front()); });
#endif

    commands->add_command(
        context,
        CommandFlags::USER,
        flash_string_vector{F_(log)},
        flash_string_vector{F_(log_level_optional), F_(traceid_optional)},
        [](Shell & shell, const std::vector<std::string> & arguments) {
            if (!arguments.empty()) {
                uuid::log::Level level;

                if (uuid::log::parse_level_lowercase(arguments[0], level)) {
                    shell.log_level(level);
                } else {
                    shell.printfln(F_(invalid_log_level));
                    return;
                }

                // see if we have extra argument, for trace
                uint16_t watch_id = 0; // no watch ID set
                if ((arguments.size() == 2) && (level == uuid::log::Level::TRACE)) {
                    watch_id = Helpers::hextoint(arguments[1].c_str());
                    shell.printfln(("Tracing only telegrams that match a device/telegram type ID of 0x%02X"), watch_id);
                }
                emsesp::EMSESP::trace_watch_id(watch_id);
            }
            shell.printfln(F_(log_level_fmt), uuid::log::format_level_uppercase(shell.log_level()));
        },
        [](Shell & shell __attribute__((unused)), const std::vector<std::string> & arguments __attribute__((unused))) -> std::vector<std::string> {
            return uuid::log::levels_lowercase();
        });

    commands->add_command(context,
                          CommandFlags::USER,
                          flash_string_vector{F_(help)},
                          [](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) { shell.print_all_available_commands(); });

    commands->add_command(context,
                          CommandFlags::USER,
                          flash_string_vector{F_(exit)},
                          [=](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) { shell.exit_context(); });

    commands->add_command(context,
                          CommandFlags::USER,
                          flash_string_vector{F_(su)},
                          [=](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              auto become_admin = [](Shell & shell) {
                                  shell.logger().log(LogLevel::NOTICE,
                                                     LogFacility::AUTH,
                                                     F("Admin session opened on console %s"),
                                                     dynamic_cast<EMSESPShell &>(shell).console_name().c_str());
                                  shell.add_flags(CommandFlags::ADMIN);
                              };

                              if (shell.has_flags(CommandFlags::LOCAL)) {
                                  become_admin(shell);
                              } else {
                                  shell.enter_password(F_(password_prompt), [=](Shell & shell, bool completed, const std::string & password) {
                                      if (completed) {
                                          uint64_t now = uuid::get_uptime_ms();

                                          if (!password.empty() && password == Settings().admin_password()) {
                                              become_admin(shell);
                                          } else {
                                              shell.delay_until(now + INVALID_PASSWORD_DELAY_MS, [](Shell & shell) {
                                                  shell.logger().log(LogLevel::NOTICE,
                                                                     LogFacility::AUTH,
                                                                     F("Invalid admin password on console %s"),
                                                                     dynamic_cast<EMSESPShell &>(shell).console_name().c_str());
                                                  shell.println(F("su: incorrect password"));
                                              });
                                          }
                                      }
                                  });
                              }
                          });

#ifdef EMSESP_DEBUG
    commands->add_command(context,
                          CommandFlags::ADMIN,
                          flash_string_vector{F_(debug)},
                          [&](Shell & shell, const std::vector<std::string> & arguments __attribute__((unused))) {
                              shell.printfln(F("%s%sEMS-ESP version %s%s"), COLOR_BRIGHT_GREEN, COLOR_BOLD_ON, Settings().app_version().c_str(), COLOR_RESET);
                              Settings settings;
                              settings.commit();
                              settings.show_settings(shell);
                              shell.println();
                          });
#endif

    // don't enter context if we're at the root
    if (context != ShellContext::MAIN) {
        Shell::enter_context(context);
    }
}

// prompt, change per context
std::string EMSESPShell::context_text() {
    switch (static_cast<ShellContext>(context())) {
    case ShellContext::MAIN:
        return std::string{'/'};

    case ShellContext::EMS:
        return std::string{"/ems"};

    case ShellContext::MQTT:
        return std::string{"/mqtt"};

    case ShellContext::BOILER:
        return std::string{"/boiler"};

    case ShellContext::SYSTEM:
        return std::string{"/system"};

    case ShellContext::THERMOSTAT:
        return std::string{"/thermostat"};

    default:
        return std::string{};
    }
}

// when in su (admin) show # as the prompt suffix
std::string EMSESPShell::prompt_suffix() {
    if (has_flags(CommandFlags::ADMIN)) {
        return std::string{'#'};
    } else {
        return std::string{'$'};
    }
}

void EMSESPShell::end_of_transmission() {
    // delete MAIN console stuff
    commands->remove_context_commands(ShellContext::MAIN);
    invoke_command(uuid::read_flash_string(F_(exit)));
}

EMSESPStreamConsole::EMSESPStreamConsole(Stream & stream, bool local)
    : uuid::console::Shell(commands, ShellContext::MAIN, local ? (CommandFlags::USER | CommandFlags::LOCAL) : CommandFlags::USER)
    , uuid::console::StreamConsole(stream)
    , EMSESPShell()
    , name_(uuid::read_flash_string(F("Serial")))
    , pty_(std::numeric_limits<size_t>::max())
    , addr_()
    , port_(0) {
}

EMSESPStreamConsole::EMSESPStreamConsole(Stream & stream, const IPAddress & addr, uint16_t port)
    : uuid::console::Shell(commands, ShellContext::MAIN, CommandFlags::USER)
    , uuid::console::StreamConsole(stream)
    , EMSESPShell()
    , addr_(addr)
    , port_(port) {
    std::vector<char> text(16);

    pty_ = 0;
    while (pty_ < ptys_.size() && ptys_[pty_])
        pty_++;
    if (pty_ == ptys_.size()) {
        ptys_.push_back(true);
    } else {
        ptys_[pty_] = true;
    }

    snprintf_P(text.data(), text.size(), PSTR("pty%u"), pty_);
    name_ = text.data();
#ifndef EMSESP_STANDALONE
    logger().info(F("Allocated console %s for connection from [%s]:%u"), name_.c_str(), uuid::printable_to_string(addr_).c_str(), port_);
#endif
}

EMSESPStreamConsole::~EMSESPStreamConsole() {
    if (pty_ != SIZE_MAX) {
#ifndef EMSESP_STANDALONE
        logger().info(F("Shutdown console %s for connection from [%s]:%u"), name_.c_str(), uuid::printable_to_string(addr_).c_str(), port_);
#endif
        ptys_[pty_] = false;
        ptys_.shrink_to_fit();
    }
}

std::string EMSESPStreamConsole::console_name() {
    return name_;
}

// Start up telnet and logging
void Console::start() {
// if we've detected a boot into safe mode on ESP8266, start the Serial console too
// Serial is always on with the ESP32 as it has 2 UARTs
#if defined(ESP32) || defined(EMSESP_STANDALONE)
    if (true) {
#elif defined(ESP8266)
    if (System::safe_mode()) {
#endif
        serial_console_.begin(SERIAL_CONSOLE_BAUD_RATE);
        serial_console_.println();

        shell = std::make_shared<EMSESPStreamConsole>(serial_console_, true);
        shell->maximum_log_messages(100); // default is 50
        shell->start();
        shell->log_level(uuid::log::Level::DEBUG); // order is: err, warning, notice, info, trace, debug, all
    }

// always start the telnet service
// note, this must be started after the network/wifi for ESP32 otherwise it'll crash
#ifndef EMSESP_STANDALONE
    telnet_.start();
    // default idle is 10 minutes, default write timeout is 0 (automatic)
    // telnet_.default_write_timeout(1000); // in ms, socket timeout 1 second
#endif
}

// handles telnet sync and logging to console
void Console::loop() {
    uuid::loop();

#ifndef EMSESP_STANDALONE
    telnet_.loop();
#endif

    Shell::loop_all();
}

} // namespace emsesp
