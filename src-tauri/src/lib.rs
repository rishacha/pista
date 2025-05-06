use std::collections::HashMap;
use std::{env, fs};
use tauri::{App, Wry};
use encoding::BOM;
use log::{error, info, Level};
use tauri::plugin::TauriPlugin;
use tauri_plugin_log::{LogTarget, RotationStrategy};
use crate::encoding::convert_to_u16;

#[cfg(debug_assertions)]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::Webview];

#[cfg(not(debug_assertions))]
const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::LogDir];

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn configure_log() -> TauriPlugin<Wry> {
    tauri_plugin_log::Builder::default()
        .format(move |out, message, record| {
            let format = time::format_description::parse(
                "[[[year]-[month]-[day]][[[hour]:[minute]:[second]]",
            )
            .unwrap();
            let file_info = record
                .file()
                .map(|location| format!("::{}", location.split("\\").last().unwrap().to_owned()))
                .unwrap_or("".to_string());
            let line_info = record
                .line()
                .map(|line| format!(":{}", line))
                .unwrap_or("".to_string());
            out.finish(format_args!(
                "{}[{}][{}{}{}] {}",
                time::OffsetDateTime::now_local()
                    .unwrap()
                    .format(&format)
                    .unwrap(),
                record.level(),
                record.target(),
                file_info,
                line_info,
                message
            ))
        })
        .targets(LOG_TARGETS)
        .filter(|l| {
            let mut filter = false;
            if cfg!(debug_assertions) {
                filter = !matches!(l.level(), Level::Trace);
            } else if cfg!(not(debug_assertions)) {
                filter = !matches!(l.level(), Level::Trace | Level::Debug);
            }
            filter
        })
        .rotation_strategy(RotationStrategy::KeepAll)
        .build()
}

fn load_settings(app: &mut App) {
    info!("Loading default settings:");

    let default_settings = serde_json::json!(
        {
            "nucleus.theme": "Dark",
            "editor.fontSize": 14,
            "editor.fontFamily": "monospace",
            "editor.lineHeight": 1.3,
            "editor.tabSize": 4,
            "editor.autosave": false,
            "nucleus.showKeybinds": false,
            "nucleus.useExternalTerminal": false,
            "terminal.external.profile": "powershell",
            "terminal.internal": {
                "profile": "powershell",
                "fontSize": "14",
                "fontFamily": "Cascadia Mono",
                "lineHeight": "1.2",
                "cursorStyle": "bar",
                "fontWeight": "normal",
            }
        }
    );
    let appdata_local = tauri::api::path::app_local_data_dir(&app.config()).unwrap();
    let settings_path = appdata_local.join("default_settings.json");

    #[cfg(debug_assertions)]
    fs::write(&settings_path, default_settings.to_string()).unwrap();

    if !settings_path.try_exists().unwrap() {
        fs::write(&settings_path, default_settings.to_string()).unwrap();
        info!(
            "Default settings file not found. Created a new default settings file. Path: {:?}",
            &settings_path
        );
    } else {
        info!("Settings path: {:?}:", settings_path);
    }

    let mut defaults = HashMap::new();
    for settings in default_settings.as_object().unwrap() {
        defaults
            .entry(settings.0.clone())
            .or_insert_with(|| settings.1.clone());
    }

    let mut settings_store = tauri_plugin_store::StoreBuilder::new(app.handle(), settings_path)
        .defaults(defaults)
        .build();

    settings_store.load().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
