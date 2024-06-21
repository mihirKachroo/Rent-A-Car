# Rent-a-Car 🚗
A one-stop-platform for users to rent cars and owners to put up cars.

## Creating and Loading Sample Database

In order to run the sample queries against the sample database without using the database-driven application, follow the following steps:
### Prerequisites

1. **MySQL Server:** Ensure that [MySQL Server](https://dev.mysql.com/doc/refman/8.0/en/installing.html) is installed on your machine.
2. **MySQL Client**: Use either a command-line client or a graphical interface such as [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/wb-installing.html) (recommended).
3. **SQL File**: Download the `sample_database/createdb.sql` file containing the SQL commands to create the tables necessary for the database.
4. **CSV Files**: Download the sample data files (in CSV format) for each table which can be found in the `sample_database` directory of the repo.
5. **SQL Query Files**: Download the four SQL files that contain test queries to run against the database (e.g. `test-sample-X.sql`).


### Instructions

#### Step 1: Set Up the MySQL Database

1. **Start MySQL Server**: Ensure that the MySQL server is running on your local machine. Open your MySQL client and log into the MYSQL server.

2. **Create and Select Database**: First create a database using a new SQL script tab:

```mysql
CREATE DATABASE rent_a_car;
```

Then switch to the newly created database:

```mysql
USE rent_a_car;
```

#### Step 2: Create the Database Tables

1. **Import the SQL Schema File**: If using MySQL Workbench, click on `File` > `Open SQL Script...` and select the `createdb.sql` file. Move to the next step.

Otherwise, execute the SQL commands in the provided `createdb.sql` file to create the tables as such:

```
mysql -u <username> -p rent_a_car < path/to/createdb.sql
```

Ensure that you replace `<username>` with your MySQL username and `path/to/createdb.sql` with the path to the downloaded `createdb.sql` file.

#### Step 3: Import Sample Data from CSV Files

1. **Import Sample Data into Tables**: If using MySQL Workbench (recommended), follow the following steps to import sample data into tables.

Right-click on the target table name in the "Schemas" panel and select the `Table Data Import Wizard` option. Select the sample data CSV file and import them into the table you want to import the sample data into. Repeat for all sample data CSV files for each table.

Alternatively, use [these steps](https://www.oneschema.co/blog/import-csv-mysql).

#### Step 4: Run Test Queries on Sample Data

If using MySQL Workbench (recommended), follow these steps:

1. **Open the SQL Query File**: Click on `File` > `Open SQL Script...` and select the downloaded SQL file containing the desired test queries.

2. **Execute the Test Queries**: Finally, execute the selected test queries and review the results in the "Results Grid" at the bottom of the MySQL Workbench window.

Otherwise, use the `source` command or direct SQL execution to run your test queries. For example:

```
source path/to/test_query.sql;
```

Replace `path/to/test_query.sql` with the path to the downloaded SQL file containing the desired test queries. Alternatively, you can copy the queries directly into the MySQL client and execute them.

***

## Running the Database-Driven Application
- Clone the project and install dependencies:
- cd into ```frontend```
- run ```npm install```
- run ```npm start```


## Features Supported

The application we are developing for our project currently contains a login/registration page and displays listings. 

