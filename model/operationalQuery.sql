SELECT * FROM registration_details ;
SELECT * FROM my_balance ;
SELECT * FROM user_full_details ;

SELECT * FROM history ;

SELECT * FROM agent_balance ;
SELECT * FROM agent_login ;
SELECT * FROM agent_full_details ;

SELECT * FROM pending ;
SELECT * FROM approved ;
SELECT * FROM rejected ;

TRUNCATE TABLE approved;

INSERT INTO agent_login(_id,mobile_number,pin)
VALUES ('01718709957' , '01718709957' , '77788') ;

UPDATE my_balance SET balance=5000
WHERE _id='01729148593' ;

CREATE TABLE remittance (
    _id VARCHAR(11) NOT NULL ,
    mobile VARCHAR(15) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL
);
