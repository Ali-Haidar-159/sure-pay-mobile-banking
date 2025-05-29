CREATE DATABASE sure_pay ;

\c sure_pay 

CREATE TABLE agent_balance 
(
    _id VARCHAR(11) PRIMARY KEY ,
    balance DECIMAL(8,2)
);

CREATE TABLE registration_details 
(
    _id VARCHAR(11) PRIMARY KEY , 
    mobile_number VARCHAR(11) NOT NULL ,
    pin VARCHAR(200) NOT NULL ,
    nid VARCHAR(50) NOT NULL 
);

CREATE TABLE user_full_details
(
    _id VARCHAR(11) PRIMARY KEY ,
    name VARCHAR(25) NOT NULL ,
    address VARCHAR(50) NOT NULL ,
    father VARCHAR(25) NOT NULL ,
    mother VARCHAR(25) NOT NULL ,
    dob DATE NOT NULL 
);


CREATE TABLE history 
(
    _id VARCHAR(11) NOT NULL ,
    amount DECIMAL(8,2) NOT NULL ,
    work VARCHAR(35) NOT NULL ,
    destination VARCHAR(35) NOT NULL
);

CREATE TABLE bank 
(
    account_number VARCHAR(60) PRIMARY KEY ,
    balance DECIMAL(10,2) NOT NULL 
);

CREATE TABLE my_balance 
(
    _id VARCHAR(11) PRIMARY KEY ,
    balance DECIMAL(8,2)
);


CREATE TABLE agent_full_details
(
    _id VARCHAR(11) PRIMARY KEY ,
    name VARCHAR(25) NOT NULL ,
    district VARCHAR(50) NOT NULL ,
    city VARCHAR(50) NOT NULL ,
    email VARCHAR(50) NOT NULL ,
    mobile_number VARCHAR(25) NOT NULL ,
    dob DATE NOT NULL 
);

CREATE TABLE agent_login
(
    _id VARCHAR(11) PRIMARY KEY , 
    mobile VARCHAR(11) NOT NULL ,
    pin VARCHAR(200) NOT NULL ,
    role VARCHAR(10) 
);


CREATE TABLE savings
(
    _id VARCHAR(11) NOT NULL ,
    name_of_savings VARCHAR(25) NOT NULL ,
    type VARCHAR(30) NOT NULL ,
    duration VARCHAR(20) NOT NULL ,
    savings_amount DECIMAL(6,2) NOT NULL ,
    bank_name VARCHAR(25) NOT NULL 
);

CREATE TABLE loan (
    _id VARCHAR(11) NOT NULL ,
    name VARCHAR(25) NOT NULL,
    nid VARCHAR(50) NOT NULL ,
    occupation  VARCHAR(25) NOT NULL,,
    reference  VARCHAR(25) NOT NULL,,
    loan_amount DECIMAL(8,2) NOT NULL ,
    income DECIMAL(8,2) NOT NULL ,
    mobile VARCHAR(15) NOT NULL,
    company VARCHAR(15) NOT NULL,
    date VARCHAR(25) DEFAULT CURRENT_DATE
);


CREATE TABLE request_money (
    _id VARCHAR(11) NOT NULL ,
    mobile VARCHAR(15) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE remittance (
    _id VARCHAR(11) NOT NULL ,
    mobile VARCHAR(15) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL
);

CREATE TABLE education (
    _id VARCHAR(11) NOT NULL ,
    month VARCHAR(15) ,
    year VARCHAR(4) ,
	payment_type VARCHAR(50)  ,
	amount DECIMAL(10,2) ,
	student_id VARCHAR(10) NOT NULL
);


CREATE TABLE donation (
    _id VARCHAR(11) NOT NULL ,
    organazation VARCHAR(100) ,
    amount DECIMAL(10,2) ,
	donar VARCHAR(50)  ,
	email VARCHAR(50)
);


CREATE TABLE pending
(
    _id VARCHAR(11) PRIMARY KEY ,
	mobile VARCHAR(11) NOT NULL ,
    name VARCHAR(25) NOT NULL ,
    address VARCHAR(50) NOT NULL ,
    father VARCHAR(25) NOT NULL ,
    mother VARCHAR(25) NOT NULL ,
    dob DATE NOT NULL ,
	pin VARCHAR(200) NOT NULL ,
    nid VARCHAR(50) NOT NULL 
);


CREATE TABLE approved
(
    _id VARCHAR(11) PRIMARY KEY ,
	mobile VARCHAR(11) NOT NULL ,
    name VARCHAR(25) NOT NULL ,
    address VARCHAR(50) NOT NULL ,
    father VARCHAR(25) NOT NULL ,
    mother VARCHAR(25) NOT NULL ,
    dob DATE NOT NULL ,
	pin VARCHAR(200) NOT NULL ,
    nid VARCHAR(50) NOT NULL 
);

CREATE TABLE rejected
(
    _id VARCHAR(11) PRIMARY KEY ,
	mobile VARCHAR(11) NOT NULL ,
    name VARCHAR(25) NOT NULL ,
    address VARCHAR(50) NOT NULL ,
    father VARCHAR(25) NOT NULL ,
    mother VARCHAR(25) NOT NULL ,
    dob DATE NOT NULL ,
	pin VARCHAR(200) NOT NULL ,
    nid VARCHAR(50) NOT NULL 
);
