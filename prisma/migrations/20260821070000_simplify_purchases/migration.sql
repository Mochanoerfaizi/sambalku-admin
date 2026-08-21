ALTER TABLE "Purchase" ADD COLUMN "itemName" TEXT;

UPDATE "Purchase" AS purchase
SET "itemName" = COALESCE(
  (
    SELECT string_agg(product.name, ', ' ORDER BY product.name)
    FROM "PurchaseItem" AS item
    JOIN "Product" AS product ON product.id = item."productId"
    WHERE item."purchaseId" = purchase.id
  ),
  'Belanja lama'
);

ALTER TABLE "Purchase" ALTER COLUMN "itemName" SET NOT NULL;
ALTER TABLE "Purchase" DROP COLUMN "supplier";
ALTER TABLE "Purchase" DROP COLUMN "description";
DROP TABLE "PurchaseItem";