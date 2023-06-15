using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/allMenuItemsWithProductCategory", async () =>
{
  using (SqlConnection conn = new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")))
  using (SqlCommand sqlCommand = new SqlCommand("GetAllMenuItemsWithProductCategoryOptimal", conn))
  {
    conn.Open();
    return await sqlCommand.ExecuteScalarAsync();
  }
});

app.MapGet("/allProductCategories", async () =>
{
  using (SqlConnection conn = new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")))
  using (SqlCommand sqlCommand = new SqlCommand("GetAllProductCategories", conn))
  {
    conn.Open();
    return await sqlCommand.ExecuteScalarAsync();
  }
});


app.Run();