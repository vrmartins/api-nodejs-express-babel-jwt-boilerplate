import { Schema, model } from 'mongoose'
import mongoTenant from 'mongo-tenant'
import tenantConfig from '../utils/tenant-config'
// TODO: Incluir os subdocumentos conforme o tipo de pessoa
// TODO: Incluir as validações conforme o tipo de pessoa
// import CustomerDataSchema from './customer-data'
// import SupplierDataSchema from './supplier-data'
// import EmployeeDataSchema from './employee-data'

const PersonSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  nickName: {
    type: String,
    trim: true
  },
  isCustomer: Boolean,
  isSupplier: Boolean,
  isEmployee: Boolean
  // customerData: { CustomerDataSchema },
  // supplierData: { SupplierDataSchema },
  // employeeData: { EmployeeDataSchema }
}, {
  timestamps: true
})

PersonSchema.plugin(mongoTenant, tenantConfig)

export default model('Person', PersonSchema)
