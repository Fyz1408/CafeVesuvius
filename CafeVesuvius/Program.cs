using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/allMenuItems", async () =>
{
  using (SqlConnection conn = new SqlConnection(builder.Configuration.GetConnectionString("TestConnection")))
  using (SqlCommand sqlCommand = new SqlCommand("GetAllMenuItems", conn))
  {
    conn.Open();
    return await sqlCommand.ExecuteScalarAsync();
  }
});

app.MapGet("/allMenuItemsWithProductCategory", async () =>
{
  using (SqlConnection conn = new SqlConnection(builder.Configuration.GetConnectionString("TestConnection")))
  using (SqlCommand sqlCommand = new SqlCommand("GetAllMenuItemsWithProductCategoryJSONFixed", conn))
  {
    conn.Open();
    return await sqlCommand.ExecuteScalarAsync();
  }
});

app.MapGet("/allProductCategories", async () =>
{
  using (SqlConnection conn = new SqlConnection(builder.Configuration.GetConnectionString("TestConnection")))
  using (SqlCommand sqlCommand = new SqlCommand("GetAllProductCategories", conn))
  {
    conn.Open();
    return await sqlCommand.ExecuteScalarAsync();
  }
});


app.Run();