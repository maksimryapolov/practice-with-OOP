<?php

use Phinx\Migration\AbstractMigration;

class CreateTableBoards extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    addCustomColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Any other destructive changes will result in an error when trying to
     * rollback the migration.
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $users = $this->table('boards');
        $users->addColumn('created', 'datetime') // Дата записи
            ->addColumn('deposit_amount', 'float', ['precision' => 2]) //Общая сумма прихода за день
            ->addColumn('expenses_per_day', 'float', ['precision' => 2]) // Общая сумма трат за день
            ->addColumn("user_id", "integer")
            ->addForeignKey("user_id", "users", "id") // Пользователь
            ->create();
    }
}
