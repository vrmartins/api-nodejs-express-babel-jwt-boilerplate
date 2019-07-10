const config = {
  /**
   * Whether the mongo tenant plugin MAGIC is enabled. Default: true
   */
  enabled: true,
  /**
   * The name of the tenant id field. Default: tenantId
   */
  tenantIdKey: 'tenantId',
  /**
   * The type of the tenant id field. Default: String
   */
  tenantIdType: String,

  /**
   * The name of the tenant id getter method. Default: getTenantId
   */
  tenantIdGetter: 'getTenantId',

  /**
   * The name of the tenant bound model getter method. Default: byTenant
   */
  accessorMethod: 'byTenant',

  /**
   * Enforce tenantId field to be set. Default: false
   * NOTE: this option will become enabled by default in mongo-tenant@2.0
   */
  requireTenantId: true
}

module.exports = config
