# CostTracker

Flutter Android app scaffold with a local SQLite database.

## Layout

- `lib/main.dart`: entry point; minimal Material app shell.
- `lib/data/app_database.dart`: SQLite open helper and `expenses` schema.
- `test/widget_test.dart`: widget smoke test.
- `test/db_test.dart`: SQLite schema test. Uses `sqflite_common_ffi`.
- `android/`: generated Android host project.
- `.opencode/`: OpenCode plugins, ECC skills, and project config.

## Toolchain

- Flutter 3.47.6 stable.
- Dart 3.13.5.
- JDK 17 at `~/jdk/temurin-17`.
- Android SDK 36 at `~/Android/Sdk`.
- `flutter doctor`: no issues.

## Commands

```bash
export PATH="$PATH:$HOME/flutter/bin"
export JAVA_HOME="$HOME/jdk/temurin-17"
export ANDROID_HOME="$HOME/Android/Sdk"

flutter pub get
flutter analyze
flutter test
flutter build apk --debug
```

## Data

- Database: `costtracker.db`.
- Version: `1`.
- Table: `expenses(id, amount, category, created_at)`.
- Migrations: none yet. Add `onUpgrade` and bump version on schema change.

## Notes

- Android-only target. No emulator or Android device is connected.
- First APK build downloads Gradle and Android deps. Later builds are faster.
- `repo.md` is the repo entry point. `changes/` records completed changes.
- `AGENT_CONFIG.md` lists installed skills and configured agent rules for fresh setup.
