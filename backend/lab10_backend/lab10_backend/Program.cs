using MySql.Data.MySqlClient;
using System.Data;

var MyAllowSpecificOrigins = "randomStringTheySay";
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

if (connectionString == null)
{
    Console.WriteLine("No connection string found");
    return;
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("*")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});


var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", () => "Hello World!");

app.MapGet("/api/get_documents", async (string format) =>
{
    Console.WriteLine("/api/get_documents?format=" + format);

    string insertUserQuery = $"SELECT * FROM documents ";
    if (format != null && format != "")
    {
        insertUserQuery += $"WHERE format = '{format}'";
    }
    List<Document> documents = new List<Document>();

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        MySqlCommand command = new MySqlCommand(insertUserQuery, connection);
        using (var reader = await command.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                Document document = new Document();
                document.id = reader.GetInt32("id");
                document.title = reader.GetString("title");
                document.author = reader.GetString("author");
                document.pages = reader.GetInt32("pages");
                document.format = reader.GetString("format");
                documents.Add(document);
            }
        }
    }

    return documents;
});

app.MapGet("/login", async (string username, string password) =>
{
    Console.WriteLine("/login");

    string insertUserQuery = $"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'";

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        MySqlCommand command = new MySqlCommand(insertUserQuery, connection);
        using (var reader = await command.ExecuteReaderAsync())
        {
            if (await reader.ReadAsync())
            {
                return true;
            }
        }
    }
    return false;
});

app.MapPost("/api/add_document", async (string title, string author, string format, string pages) =>
{
    Console.WriteLine("/api/add_document");

    string insertUserQuery = $"INSERT INTO documents (title, author, pages, format) VALUES ('{title}', '{author}', {pages}, '{format}')";

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        MySqlCommand command = new MySqlCommand(insertUserQuery, connection);
        await command.ExecuteNonQueryAsync();
    }
});

app.MapDelete("/api/remove_document", async (string id) =>
{
    Console.WriteLine("/api/remove_document");

    string insertUserQuery = $"DELETE FROM documents WHERE id = {id}";

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        MySqlCommand command = new MySqlCommand(insertUserQuery, connection);
        await command.ExecuteNonQueryAsync();
    }
});

app.MapPut("/api/update_document", async (string id, string title, string author, string format, string pages) =>
{
    Console.WriteLine("/api/update_document");

    string insertUserQuery = $"UPDATE documents SET title = '{title}', author = '{author}', pages = {pages}, format = '{format}' WHERE id = {id}";

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();
        MySqlCommand command = new MySqlCommand(insertUserQuery, connection);
        await command.ExecuteNonQueryAsync();
    }
});



app.Run();

class Document
{
    public int id { get; set; }
    public string title { get; set; }
    public string author { get; set; }
    public int pages { get; set; }
    public string format { get; set; }
}






