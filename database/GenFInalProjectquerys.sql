SELECT id, name FROM Products;

SELECT 
    P.id AS product_id, 
    P.name AS product_name, 
    P.price, 
    C.name AS category_name
FROM Products P
LEFT JOIN Categories C ON P.category_id = C.id;

SELECT 
    O.id AS order_id, 
    O.purchase_date, 
    O.state, 
    O.total
FROM Orders O
JOIN Users U ON O.user_id = U.id
WHERE U.id = 5; 



SELECT 
    P.id, 
    P.name, 
    COUNT(OP.product_id) AS total_vendido
FROM OrderProducts OP
JOIN Products P ON OP.product_id = P.id
GROUP BY P.id, P.name
ORDER BY total_vendido DESC
LIMIT 1;

SELECT 
    C.name AS category_name, 
    SUM(OP.quantity * P.price) AS total_ventas
FROM OrderProducts OP
JOIN Products P ON OP.product_id = P.id
JOIN Categories C ON P.category_id = C.id
GROUP BY C.name
ORDER BY total_ventas DESC;
