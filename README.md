# Rent-a-Car 🚗
A one-stop-platform for users to rent cars and owners to put up cars.
> Group Members: Mihir Kachroo, Mike Kwak, Parsh Parikh, Rawsab Said, Siddharth Viswanath

## 🔨 Creating and Loading Sample Database

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




## 🏗️ Creating and Loading Production Database
### Description of Production Data
We generated the production dataset using a combination of synthetic data and cleaned-up real data. The data is sourced from `vehicles.csv` (downloaded from [Kaggle](https://www.kaggle.com/datasets/austinreese/craigslist-carstrucks-data)) and we made several enrichments using the `Faker` library to create realistic User and Car Owner profiles, as well as detailed car listings and reviews.

### How the Data is Imported, Generated, Cleaned
1. **Loading and Cleaning Data:**
    - Raw data loaded from `vehicles.csv`.
    - Missing values filled using randomly sampled values from the non-missing data or generated using specific rules.
    - Additional columns are populated with synthetic data to make sure the data is complete, and there are no `NaN`, `NULL` or `None` values.
2. **Data Transformation:**
    - Dates generated within a specified range for User, Owner, Rentals tables.
    - Descriptions & other text fields generated using the Faker library.
    - Non-ASCII characters handled appropriately (manual filtering).
3. **Data Export:**
    - The cleaned & enriched data is saved into multiple CSV files representing different tables in the database, then imported onto our MySQL Workbench setup.

You can find all our production data in CSV format [here](https://github.com/mihirKachroo/Rent-A-Car/tree/main/production_database)

### Using our production data to populate the database

To populate your database with the production dataset, follow these steps:

1. Setup a Python Environment and Install the following libraries:
```
pip install pandas numpy faker
```

2. Run ALL CELLS in the provided Jupyter Notebook `My Production Database.ipynb` found [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/Production%20Database.ipynb) to generate and clean the data. This notebook will output the following CSV files:
- `prod_cars_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_cars_table.csv)
- `prod_users_table.csv`[here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_users_table.csv)
- `prod_owners_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_owners_table.csv)
- `prod_rentals_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_rentals_table.csv)
- `prod_listings_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_listings_table.csv)
- `prod_favorites_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_favorites_table.csv)
- `prod_states_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_states_table.csv)
- `prod_reviews_table.csv` [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/production_database/prod_reviews_table.csv)

NOTE: due to randomness we introduced into the dataset, we will have different values in the User, Owner, Reviews, Rentals tables for each run of the notebook. It is crucial all cells are run one-by-one to ensure no discrepancy between Foreign keys in the data.

3. Import CSV Files into MySQL Database Using MySQL Workbench. For each CSV file, follow these steps:
	- Create Tables & Constraints using the script [here](https://github.com/mihirKachroo/Rent-A-Car/blob/main/sample_database/createdb.sql)
	- Follow the same steps from **Step 1: Set Up the MySQL Database**, already covered in our Sample Data loading steps.


## 🖥️ Running the Database-Driven Application
- Clone the project and install dependencies:
- cd into ```frontend```
- run ```npm install```
- run ```npm start```


## 💡 Features Supported

The application we are developing for our project currently contains a login/registration page and displays listings. 

### Features and Functionalities

#### R6. Login and Registration Page 🧑‍💻

##### Frontend

- **Login Page**: `src/pages/LoginPage.tsx`
- **Register Page**: `src/pages/RegisterPage.tsx`
- **Owner Login Page**: `src/pages/OwnerLoginPage.tsx`
- **Owner Main Page**: `src/pages/OwnerMainPage.tsx`
- **Authentication Service**: `src/services/authService.ts`
- **Authentication Context**: `src/context/AuthContext.tsx`

##### Backend

- **Auth Router**: `src/routes/authRouter.js`
- **Auth Controller**: `src/controllers/authController.js`

#### R7. Basic Search Filters 🔍

##### Frontend

- **Search Page**: `src/pages/SearchPage.tsx`
- **Listing Service**: `src/services/listingService.ts`
- **Advanced Search Component**: `src/components/AdvancedSearch.tsx`

#### R8. Shortlist for User Favorites 🔖

##### Frontend

- **Listing Card Component**: `src/components/ListingCard.tsx`
- **Favorites Page**: `src/pages/FavouritesPage.tsx`
- **Search Page**: `src/pages/SearchPage.tsx`
- **User Service**: `src/services/userService.ts`

##### Backend

- **Favourite Router**: `src/routes/favouriteRouter.js`
- **Favourite Controller**: `src/controllers/favouriteController.js`
