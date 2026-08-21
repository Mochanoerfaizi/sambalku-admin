UPDATE "Expense" AS expense
SET "description" = COALESCE(expense."description", category.name, 'Pengeluaran lama')
FROM "ExpenseCategory" AS category
WHERE expense."categoryId" = category.id;

ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";
ALTER TABLE "Expense" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "Expense" DROP COLUMN "categoryId";
DROP TABLE "ExpenseCategory";