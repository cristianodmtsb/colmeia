module.exports = {
  '@magento/venia-ui/lib/components/Button':
    '@webjump/colmeia/lib/components/Button',

  '@magento/venia-ui/lib/components/App/app.js':
    '@webjump/colmeia/lib/overrides/components/App/app.js',

  '@magento/venia-ui/lib/queries/getCartDetails.graphql':
    '@webjump/colmeia/lib/queries/getCartDetails.graphql',

  '@magento/venia-ui/lib/components/Checkbox/checkbox.js':
    '@webjump/colmeia/lib/overrides/components/Checkbox/checkbox.js',
};
