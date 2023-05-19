'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crea la tabla 'orders'
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      direccionEnvio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'enviado', 'entregado', 'cancelado'),
        defaultValue: 'pendiente'
      },
      fechaCreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fechaActualizacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Crea la tabla 'order_products'
    await queryInterface.createTable('order_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Añade una restricción de clave única a la tabla 'order_products'
    await queryInterface.addConstraint('order_products', {
      fields: ['orderId', 'productId'],
      type: 'unique',
      name: 'unique_order_product'
    });

    // Añade un índice a la columna 'orderId' en la tabla 'order_products'
    await queryInterface.addIndex('order_products', ['orderId']);

    // Añade un índice a la columna 'productId' en la tabla 'order_products'
    await queryInterface.addIndex('order_products', ['productId']);

    // Añade un índice compuesto a las columnas 'orderId' y 'productId' en la tabla 'order_products'
    await queryInterface.addIndex('order_products', ['orderId', 'productId']);

    // Añade una restricción de clave externa a la tabla 'orders'
    await queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_order_user',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'fk_order_user');
    await queryInterface.removeIndex('orders', ['userId']);
    await queryInterface.dropTable('order_products');
    await queryInterface.dropTable('orders');
  }
};