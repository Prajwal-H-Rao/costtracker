// App-level SQLite helper.
// Opens the local database and creates the initial schema.
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class AppDatabase {
  static const int version = 1;

  // Opens the database with the current schema version.
  static Future<Database> open() async {
    final databasesPath = await getDatabasesPath();
    final path = join(databasesPath, 'costtracker.db');
    return openDatabase(path, version: version, onCreate: createSchema);
  }

  // Creates the initial expenses table.
  static Future<void> createSchema(Database db, int version) async {
    await db.execute('''
      CREATE TABLE expenses (
        id INTEGER PRIMARY KEY,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    ''');
  }
}
