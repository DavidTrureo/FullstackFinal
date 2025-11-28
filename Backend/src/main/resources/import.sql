/* ============================================================
   1. Insertar productos de ejemplo
   ============================================================ */
INSERT INTO products (name, description, price, image, color) VALUES
('Teclado Mecánico RGB', 'Teclado mecánico con luces RGB y switches cherry red', 49990, '/imagenes/teclado_gamer.webp', 'Negro'),
('Samsung Smart TV 55', 'Imagen vibrante y realista gracias al potente Crystal Processor 4K', 379990, '/imagenes/smart_tv.webp', 'Negro'),
('Sony Audífonos Bluetooth', 'WH-1000XM5 con cancelación de ruido y conectividad Bluetooth', 249990, '/imagenes/gamer_auriculares.webp', 'Negro'),
('Memoria Corsair 16GB DDR5', 'RAM DDR5 optimizada para alto rendimiento en juegos', 89990, '/imagenes/memoria_ram.webp', 'Negro'),
('Asus Nvidia RTX 4080TI', 'Tarjeta gráfica de alto rendimiento para gaming en 4K', 1399990, '/imagenes/rtx_4080.jpg', 'Negro'),
('CPU Intel Core i7-12700K', 'Procesador Alder Lake de 12 núcleos para multitareas exigentes', 289990, '/imagenes/intel_i7.jpg', 'Plateado');



/* ============================================================
   2. Selección y verificación de base de datos
   ============================================================ */
USE db_cart_springboot;

-- Confirmar base activa
SELECT DATABASE(); -- Debe devolver db_cart_springboot

-- Mostrar todas las tablas
SHOW TABLES;



/* ============================================================
   3. Consultas de verificación de datos
   ============================================================ */
-- Consultar registros de las tablas principales
SELECT * FROM users;
SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM products;

-- Contar productos
SELECT COUNT(*) AS total_productos FROM products;

-- Contar usuarios
SELECT COUNT(*) AS total_usuarios FROM users;



/* ============================================================
   4. Operaciones sobre la tabla products
   ============================================================ */
-- Reiniciar contador AUTO_INCREMENT
ALTER TABLE products AUTO_INCREMENT = 1;

-- Eliminar producto específico
DELETE FROM products WHERE id = 1;

-- Actualizar producto existente
UPDATE products
SET name = 'Samsung Smart TV 70'
WHERE id = 2;

-- Desactivar restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- Vaciar tabla (más rápido que DELETE)
TRUNCATE TABLE products;

-- Reactivar restricciones
SET FOREIGN_KEY_CHECKS = 1;

-- Validar que quedó vacía
SELECT COUNT(*) AS productos_restantes FROM products;



/* ============================================================
   5. Operaciones sobre la tabla orders
   ============================================================ */
-- Eliminar todos los registros de orders
DELETE FROM orders;

-- Reiniciar contador AUTO_INCREMENT
ALTER TABLE orders AUTO_INCREMENT = 1;



/* ============================================================
   6. Operaciones sobre la tabla users
   ============================================================ */
-- Actualizar contraseña de un usuario específico
UPDATE db_cart_springboot.users
SET password = 'password'
WHERE email = 'david@david.cl';

-- Insertar usuario de prueba
INSERT INTO users (name, email, password) VALUES
('David Trureo', 'david@david.cl', 'password'),
('Admin', 'admin@admin.com', 'admin123');

-- Consultar usuarios
SELECT * FROM users;



/* ============================================================
   7. Consultas adicionales útiles
   ============================================================ */
-- Ver productos con precio mayor a 100000
SELECT * FROM products WHERE price > 100000;

-- Ver pedidos con más de 2 ítems
SELECT * FROM orders WHERE id IN (
    SELECT order_id FROM order_items GROUP BY order_id HAVING COUNT(*) > 2
);

-- Ver usuarios que han realizado pedidos
SELECT DISTINCT u.*
FROM users u
JOIN orders o ON u.id = o.user_id;

-- Ver productos más vendidos (ejemplo con order_items)
SELECT p.name, COUNT(*) AS cantidad_vendida
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.name
ORDER BY cantidad_vendida DESC;