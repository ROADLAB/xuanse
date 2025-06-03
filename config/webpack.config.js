{
  test: /\.(jpg|jpeg|png|gif|svg)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'static/media/[name].[hash][ext]'
  }
} 