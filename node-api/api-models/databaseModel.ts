import * as Sequelize from 'sequelize';
import sequelize from 'sequelize';
import {DataBase} from '../src/config/database'

export const Product = DataBase.define('product', { // Sequelize knows to search for products in db for some reason
  product_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  colors: {
    type: Sequelize.JSON
  },
  number_in_stock:{
    type:Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING(20)
  },
  image: {
    type: Sequelize.STRING(100)
  },
  price:{
    type: Sequelize.JSON
  },
  description: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});

export const User = DataBase.define('user', {
  user_id: {
    type: Sequelize.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    unique:true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type:Sequelize.TEXT,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
  },
  first_name: {
    type: Sequelize.TEXT,
  },
  last_name: {
    type: Sequelize.TEXT,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  cart_id: {
    type: Sequelize.TEXT,
  }
},
{
  underscored: true
});

export const Cart = DataBase.define('cart', {
  cart_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  total: {
    type: Sequelize.NUMBER,
    defaultValue: 0
  },
  formatted_total: {
    type:Sequelize.TEXT,
    defaultValue: '0$'
  },
  payment_method: {
    type: Sequelize.TEXT
  }
},{
  timestamps:true
});
export const CartEntry = DataBase.define('cart_entry', {
  cart_entry_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type:Sequelize.INTEGER,
  }
},{
  timestamps: true
});
export const Address = DataBase.define('address', {
  address_id: {
    type: sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  first_name: {
    type: sequelize.TEXT,
    allowNull: false
  },
  last_name: {
    type: sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: sequelize.TEXT,
    unique: true,
    allowNull: false
  },
  phone_number: {
    type: sequelize.TEXT,
    allowNull: false
  },
  complete_street: {
    type: sequelize.TEXT,
    allowNull: false
  },
  country: {
    type: sequelize.TEXT,
    allowNull: false
  },
  county: {
    type: sequelize.TEXT,
    allowNull: false
  },
  city: {
    type: sequelize.TEXT,
    allowNull: false
  },
  postal_code: {
    type: sequelize.TEXT,
    allowNull: false
  },
  type: {
    type: sequelize.TEXT,
    allowNull: false
  },
  company: {
    type: sequelize.TEXT
  }
},{
  timestamps: true
});
export const DeliveryService = DataBase.define('delivery_service',{
    delivery_service_id: {
      type: Sequelize.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: {
      type:Sequelize.TEXT,
      unique: true,
      allowNull: false
    }
},{
  timestamps: true
});
// Associations

// cart 1 to 1 with user
Cart.hasOne(User, {foreignKey: {name: 'cart_id'}});
User.belongsTo(Cart, {foreignKey: {name: 'cart_id'}});
// cart 1 to many with cart_entries
Cart.hasMany(CartEntry, {foreignKey: {name: 'cart_id'}});
CartEntry.belongsTo(Cart, {foreignKey: {name: 'cart_id'}});
// product one to many with cart_entries
Product.hasMany(CartEntry, {foreignKey: {name: 'product_id'}});
CartEntry.belongsTo(Product, {foreignKey: {name: 'product_id'}});
// cart one to many addresses
Address.hasOne(Cart, {foreignKey: {name: 'cart_id'}});
Cart.hasMany(Address, {foreignKey: {name: 'cart_id'}});
// user one to many addresses
Address.hasOne(User, {foreignKey: {name: 'user_id'}});
User.hasMany(Address, {foreignKey: {name: 'user_id'}});
// delivery service 1 to many cart
DeliveryService.hasMany(Cart, {foreignKey: {name:'delivery_service_id'}});
Cart.belongsTo(DeliveryService, {foreignKey: {name:'delivery_service_id'}});
