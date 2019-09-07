const Sequelize = require("sequelize")
const sequelize = new Sequelize("postgres://localhost/acme_product_offerings", {
  logging: false,
  define: {
    timestamps: false
  }
})

const { DECIMAL, STRING, UUID, UUIDV4 } = Sequelize

// Product, Company, Offering

const idDefinition = {
  type: UUID,
  defaultValue: UUIDV4,
  allowNull: false,
  primaryKey: true,
}

const nameDefinition = {
  type: STRING,
  // unique: true,
  allowNull: false,
}

const Company = sequelize.define("company", {
  id: idDefinition,
  name: nameDefinition,
})

const Product = sequelize.define("product", {
  id: idDefinition,
  name: nameDefinition,
  suggestedPrice: {
    type: DECIMAL,
    allowNull: false,
  }
})

const Offering = sequelize.define("offering", {
  id: idDefinition,
  price: {
    type: DECIMAL,
    allowNull: false,
  },
  productId: {
    type: UUID,
    allowNull: false,
  },
  companyId: {
    type: UUID,
    allowNull: false,
  }
})

Product.hasMany(Offering)
Offering.belongsTo(Product)

Company.hasMany(Offering)
Offering.belongsTo(Company)

const setup = async () => {
  await sequelize.sync({ force: true })

  const companies = [
    { name: "My Company" },
    { name: "Fullstack" },
    { name: "Haoyu's Company" },
  ]

  const products = [
    { name: "foo", suggestedPrice: 2.20 },
    { name: "bar", suggestedPrice: 3.50 },
    { name: "bazz", suggestedPrice: 1.50 },
  ]

  const [comp1, comp2, comp3] = await Promise.all(companies.map(company => Company.create(company)))
  const [prod1, prod2, prod3] = await Promise.all(products.map(product => Product.create(product)))

  const offerings = [
    { price: 1.50, productId: prod1.id, companyId: comp1.id },
    { price: 2.50, productId: prod2.id, companyId: comp2.id },
    { price: 3.25, productId: prod3.id, companyId: comp3.id },
  ]

  await Promise.all(offerings.map(offering => Offering.create(offering)))
}

module.exports = {
  setup,
  models: {
    Product,
    Company,
    Offering
  }
}
