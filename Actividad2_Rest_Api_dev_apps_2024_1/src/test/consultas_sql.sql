ALTER TABLE fuente_ingresos
CHANGE COLUMN icono valor DECIMAL(8,4);

USE appkodular;


ALTER TABLE fuente_ingresos
MODIFY COLUMN descripcion_fuente TEXT;




ALTER TABLE fuente_ingresos
ADD CONSTRAINT nombreUnico UNIQUE (nombre_fuente);