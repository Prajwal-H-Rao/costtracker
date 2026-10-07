import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

import 'package:costtracker/data/app_database.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  sqfliteFfiInit();
  databaseFactory = databaseFactoryFfi;

  test('creates and queries expenses table', () async {
    final db = await databaseFactoryFfi.openDatabase(
      inMemoryDatabasePath,
      options: OpenDatabaseOptions(version: AppDatabase.version, onCreate: AppDatabase.createSchema),
    );

    await db.insert('expenses', {
      'amount': 12.5,
      'category': 'Food',
      'created_at': '2026-10-06',
    });

    final rows = await db.query('expenses');
    expect(rows.length, 1);
    expect(rows.first['category'], 'Food');

    await db.close();
  });
}
