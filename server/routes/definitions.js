/**
 * @typedef Person
 *
 * @property {string} id - Id
 * @property {string} tenantId.required - Tenant Id
 * @property {string} firstName.required - First Name
 * @property {string} lastName.required - Last Name
 * @property {string} nickName.required - Nickname
 * @property {string} isCustomer.required - Is Customer?
 * @property {string} isSupplier.required - Is Supplier?
 * @property {string} isEmployee.required - Is Employee?
 * @property {customerData.model} customerData - Customer Data
 * @property {supplierData.model} supplierData - Supplier Data
 * @property {employeeData.model} employeeData - Employee Data
 * @property {Array<address>} addresses - Addresses
 */

/**
 * @typedef Tenant
 *
 * @property {string} id - Id
 * @property {string} name.required - First Name
 */

/**
 * @typedef address
 *
 * @property {enum} type.required - Type - eg: Billing,Shipping
 * @property {string} address.required - Address
 * @property {string} number.required - Number
 * @property {string} neighborhood.required - Neighborhood
 * @property {string} complement - Complement
 * @property {string} zipcode.required - Zipcode
 * @property {string} city.required - City
 * @property {string} country.required - Country
 */

/**
 * @typedef customerData
 *
 * @property {string} data.required - Data
 */

/**
 * @typedef employeeData
 *
 * @property {string} salary.required - Salary
 */

/**
 * @typedef supplierData
 *
 * @property {string} data.required - Data
 */
