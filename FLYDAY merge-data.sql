create schema FLYDAY;
use FLYDAY;

-- 1.會員 ----------------------------

create table MEM_LEVEL (
	MEM_LEVEL_NO int primary key not null auto_increment,
    MEM_LEVEL_NAME varchar(10) not null,
    MEM_LEVEL_DISC decimal(3,2) not null
);

insert into MEM_LEVEL(MEM_LEVEL_NAME, MEM_LEVEL_DISC)
values
("普通會員", 0.95),
("白銀會員", 0.9),
("黃金會員", 0.85),
("鑽石會員", 0.8);

create table MEM (
	MEM_NO int primary key not null auto_increment,
    MEM_LEVEL_NO int default 1 not null,
    MEM_ACC varchar(12) not null unique,
    MEM_PWD varchar(64) not null,
    MEM_ACC_STATUS tinyint default 0 not null,
    MEM_NAME varchar(20),
    MEM_GENDER tinyint default 0 ,
    MEM_BDAY date,
    MEM_EMAIL varchar(40) not null unique,
    MEM_MOBILE char(10) not null unique,
    MEM_CITY varchar(5),
    MEM_DIST varchar(5),
    MEM_ADDR varchar(40),
    MEM_REG_DATE datetime default current_timestamp,
    MEM_PIC longblob,
    MEM_ACT_STATUS tinyint default 0,
    constraint FK_MEM_MEM_LEVEL foreign key(MEM_LEVEL_NO) references MEM_LEVEL(MEM_LEVEL_NO)
);

insert into MEM (MEM_LEVEL_NO, MEM_ACC , MEM_PWD, MEM_ACC_STATUS, MEM_NAME, MEM_GENDER, MEM_BDAY, MEM_EMAIL, MEM_MOBILE, MEM_CITY, MEM_DIST, MEM_ADDR, MEM_ACT_STATUS)
values
(1, "testacc01", "92c22c6a826cbcf2d946be9cc0e48fa49db80d5bd8b60677acddcf9e4b660031", 0, "Peter Wu", 1, "1988-12-12", "testacc01@gmail.com", "0911223456", "桃園市", "中壢區", "復興路46號9樓", 0),	-- 測試密碼testpwd01
(2, "testacc02", "26bf9b805931f1fe7151c5484f94447536c6da6ac02dd2f95e2e17ffad620df9", 1, "William Lee", 0, "1994-11-20", "testacc02@gmail.com", "0923551225", "澎湖縣", "馬公市", "安宅里1-40號", 1), -- 測試密碼testpwd02
(3, "testacc03", "a5603e56d20c85b9a72eb5b4d6261ef1ccf9255ea12c87a605214cfc10cff89f", 2, "Ronald Liu", 0, "1978-02-19", "testacc03@gmail.com", "0919325883", "高雄市", "苓雅區", "三多一路289號", 0), -- 測試密碼testpwd03
(4, "testacc04", "6ed85ee34095f1e868b028d79fe30046915aef8a5666f7151dd7f8f1ddd2a39c", 1, "王曉明", 2, "1963-12-08", "testacc04@gmail.com", "0967221332", "花蓮縣", "壽豐鄉", "志學村志學新邨184號", 0), -- 測試密碼testpwd04
(1, "testacc05", "e5579090ec5508197c2700406fa215cc29c64abeecbbf7b256af2d78d1dcd5db", 1, "蔡陰魂", 1, "1956-08-31", "darksoul.gov@gmail.com", "0912345678", "臺北市", "中正區", "重慶南路一段122號", 0), -- 測試密碼testpwd05
(1, "testacc06", "74900ba56c2a7bc8b98f7c616565807831d364bfcff02be45e0b6423f34be021", 1, "韓國偷", 1, "1957-06-17", "koreasteal@gmail.com", "0933558133", "高雄市", "那瑪夏區", "秀嶺巷87號", 1), -- 測試密碼testpwd06
(3, "testacc07", "9ab2688d7bdfc5e1d5593198d1c69adf3c5d35fb4502cdbe77cf21ad271d5966", 2, "王4間", 1, "1950-01-01", "fullhouse@gmail.com", "0922512835", "臺北市", "中山區", "長春路107號", 0), -- 測試密碼testpwd07
(2, "testacc08", "e64b10b2eec2e5381a499830e370f564983b0a4d7653dd186980ae9ae83814fd", 1, "高甲魚", 1, "1980-10-17", "dontsingfish@gmail.com", "0973827155", "臺北市", "內湖區", "民權東路六段423號", 1), -- 測試密碼testpwd08
(2, "testacc09", "b356b77e0010ecc2b9c978aeb5cf6642fb24f71aea07e9aecdc6c112dff280f8", 1, "Ellie Wang", 1, "2000-02-16", "testacc09@gmail.com", "0938838848", "臺中市", "大甲區", "順天路158號", 0), -- 測試密碼testpwd09
(1, "testacc10", "e469477c36e718e1fbdfe0b9eff8cc05cf7eaad73c1abf18702fa0cc49ad4e1b", 0, "Anderson Peng", 1, "1988-12-12", "testacc10@gmail.com", "0979217375", "澎湖縣", "白沙鄉", "目斗嶼1號", 0), -- 測試密碼testpwd10
(4, "testacc11", "568ea9b696a005880da0ea334fbb43decb136b5a6f25eb04821378737dc0d635", 0, "Ken-Yuan Kan", 1, "1993-12-13", "410122037@gms.ndhu.edu.tw", "0919319702", "桃園市", "蘆竹區", "外社里草子崎路二鄰199巷92弄14號", 0); -- 測試密碼testpwd11

-- 2.廠商 -------------

CREATE TABLE STORE(
    STORE_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    STORE_ACC VARCHAR(20) NOT NULL,
    STORE_PWD VARCHAR(12) NOT NULL,
    ACC_STATUS TINYINT DEFAULT(0)  COMMENT '0:帳號未啟用, 1:帳號已啟用, 2:帳號停權',
    STORE_NAME VARCHAR(50) NOT NULL,
    STORE_TEL VARCHAR(10) NOT NULL,
    STORE_ADD VARCHAR(50) NOT NULL,
    STORE_EMAIL VARCHAR(40) NOT NULL,
    STORE_REG_DATE DATETIME DEFAULT CURRENT_TIMESTAMP,
    STORE_REPLY VARCHAR(100),
    STORE_REVIEW TINYINT DEFAULT(0) COMMENT '0:未審核, 1:未過審, 2:已過審',
    STORE_NOTE VARCHAR(800)
);

INSERT INTO STORE(
     STORE_ACC,
     STORE_PWD,
     ACC_STATUS,
     STORE_NAME,
     STORE_TEL,
     STORE_ADD,
     STORE_EMAIL,
     STORE_REG_DATE,
     STORE_REPLY,
     STORE_REVIEW,
     STORE_NOTE
 ) VALUES ('a111111','abcdef123456','0','天空旅行社','0212345678','台北市行天宮','aaa@gmail.com',null,'','0',''),
 ('a222222','aaaaaa111111','1','第一旅行社','0211111111','台北市市政府','bbb@gmail.com','2023-07-26 00:00:00','請耐心等待回復','2',''),
 ('a333333','bbbbbb222222','1','第二旅行社','0222222222','台北市小巨蛋','ccc@gmail.com','2023-07-27 00:00:00','慢慢等我回你','2','新創公司');

-- 3. 後台----------------------------

CREATE TABLE 
    EMP(
        EMP_NO INT NOT NULL AUTO_INCREMENT,
        EMP_ACC VARCHAR(20) NOT NULL,
        EMP_PWD VARCHAR(20) NOT NULL,
        EMP_NAME VARCHAR(10) NOT NULL,
        EMP_STATUS TINYINT NOT NULL DEFAULT 0 COMMENT '0:在職(預設)，1:已離職',
        CONSTRAINT PK PRIMARY KEY (EMP_NO)
    );

INSERT INTO
    EMP (
        EMP_NO,
        EMP_ACC,
        EMP_PWD,
        EMP_NAME,
        EMP_STATUS
    )
VALUES 
( 1,'LOGICGMAILCOM','LOGIC','吳大大',0),
( 2,'MUMEIGMAILCOM','MUMEI','木木鴞',0),
( 3,'9527GMAILCOM','9527','唐伯虎',0);

CREATE TABLE
    AUTH_FUN(
        FUN_NO INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        FUN_NAME VARCHAR(10) NOT NULL
    );
    
    INSERT INTO 
    AUTH_FUN(
        FUN_NO,
        FUN_NAME
    )
    VALUES
    (1,'決策與預算分配'),
    (2,'專案撰寫與執行'),
    (3,'清潔，主管交辦事項');
    
    
    CREATE TABLE
    FUN(
        FUN_NO INT NOT NULL,
        EMP_NO INT NOT NULL,
        CONSTRAINT FOREIGN KEY(EMP_NO) REFERENCES EMP(EMP_NO),
        CONSTRAINT FOREIGN KEY(FUN_NO) REFERENCES AUTH_FUN(FUN_NO)
    );

	alter table FUN add constraint primary key(FUN_NO, EMP_NO);
    
INSERT INTO
    FUN(
        FUN_NO,
        EMP_NO
    )
    VALUES
    (1,1),
    (2,2),
    (3,3);

-- 4.行程(崇峻) -------------------------------

CREATE TABLE PKG(
    PKG_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    STORE_NO INT NOT NULL,
    PKG_NAME VARCHAR(40) NOT NULL,
    PKG_GROUP TINYINT NOT NULL COMMENT '0:不開放揪團, 1:開放揪團',
    PKG_GATHER VARCHAR(40) NOT NULL,
    PKG_PLACE VARCHAR(40) NOT NULL,
    PKG_ADDRESS VARCHAR(40) NOT NULL,
    PKG_LATITUDE DOUBLE NOT NULL,
    PKG_LONGITUDE DOUBLE NOT NULL,
    PKG_SORT TINYINT NOT NULL COMMENT '0:遊船觀光, 1:單車旅遊, 2:文化體驗, 3:水上活動, 4:露營登山',
    PKG_CONTENT VARCHAR(800) NOT NULL,
    PKG_NOTICE VARCHAR(500) NOT NULL,
    PKG_REVIEW TINYINT NOT NULL DEFAULT(0) COMMENT '0:未審核, 1:未過審, 2:已過審未上架, 3:已過審已上架, 4:已過審已下架',
    PKG_STARTDATE DATETIME,
    PKG_NOT_REASON VARCHAR(800),
    PKG_RATETOTAL INT,
    PKG_COMMENT_NUM INT,
    PKG_REFPOLICY VARCHAR(500) NOT NULL,
    CONSTRAINT fk_PKG_STORE FOREIGN KEY(STORE_NO) REFERENCES STORE(STORE_NO)
);

INSERT INTO PKG(
	STORE_NO,
    PKG_NAME,
    PKG_GROUP,
    PKG_GATHER,
    PKG_PLACE,
    PKG_ADDRESS,
    PKG_LATITUDE,
    PKG_LONGITUDE,
    PKG_SORT,
    PKG_CONTENT,
    PKG_NOTICE,
    PKG_REVIEW,
    PKG_STARTDATE,
    PKG_NOT_REASON,
    PKG_RATETOTAL,
    PKG_COMMENT_NUM,
    PKG_REFPOLICY
) VALUES('2','花蓮行','0','花蓮火車站','花蓮瑞穗牧場','978花蓮縣瑞穗鄉6鄰157號','23.479216665127655','121.34597589749752','2','玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩玩','需要自行前往火車站','3','2023-07-27 00:00:00','null','10','3','於活動開始前2天內取消其可退款'),
('3','高雄行','1','屏東火車站','墾丁大街','屏東縣恆春鎮墾丁路946','21.945566','120.797632','0','錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢錢','需要自行前往屏東火車站','3','2023-07-30 00:00:00','null','16','8','於活動開始前5天內取消其可退款'),
('3','台北游','1','台北車站','墾丁大街','978花蓮縣瑞穗鄉6鄰157號','25.038720','121.553998','0','空空空空空空空空空空空空空空空空空空空空空空','需要自行前往高雄火車站','1',null,'行程資訊有誤差，需要重新制定','0','0','於活動開始前5天內取消其可退款');

CREATE TABLE PKG_PIC(
    PKG_PIC_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    PKG_NO INT NOT NULL,
    PKG_IMG LONGBLOB,
    CONSTRAINT fk_PKGPIC_PKG FOREIGN KEY(PKG_NO) REFERENCES PKG(PKG_NO)
);

 INSERT INTO PKG_PIC(
     PKG_NO,
     PKG_IMG
 ) VALUES('1',null),
 ('1',null),
 ('2',null);


CREATE TABLE PKG_PLAN(
    PKG_PLAN_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    PKG_NO INT NOT NULL,
    PKG_PLAN_CONTENT VARCHAR(500) NOT NULL,
    PKG_PLAN_NUM INT NOT NULL,
    PKG_GROUP_MONEY INT,
    PKG_PLAN_REVIEW TINYINT NOT NULL DEFAULT(1) COMMENT '0:下架, 1:上架',
    CONSTRAINT fk_PKGPLAN_PKG FOREIGN KEY(PKG_NO) REFERENCES PKG(PKG_NO)
);

 INSERT INTO PKG_PLAN(
     PKG_NO,
     PKG_PLAN_CONTENT,
     PKG_PLAN_NUM,
     PKG_GROUP_MONEY,
     PKG_PLAN_REVIEW
 ) VALUES('1','花蓮雙人遊，可以體驗瑞穗牧場的動物世界','2',null,'1'),
 ('1','花蓮家庭方案，可以體驗瑞穗牧場的動物世界','4',null,'0'),
 ('2','高雄三日遊，盤子之旅','1','1000','1');

create table PKG_PLAN_PIC (
	PKG_PLAN_PIC_NO int primary key not null auto_increment,
    PKG_PLAN_NO int not null,
    PKG_PLAN_IMG LONGBLOB,
    CONSTRAINT fk_PKGPLANPIC_PKGPLAN FOREIGN KEY(PKG_PLAN_NO) REFERENCES PKG_PLAN(PKG_PLAN_NO)
);

CREATE TABLE PKG_PLAN_DETAILS(
    PKG_DETAILS_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    PKG_PLAN_NO INT NOT NULL,
    PKG_DAY_START DATETIME NOT NULL,
    PKG_DAY_END DATETIME NOT NULL,
    PKG_PEOPLE_MAX INT,
    PKG_PEOPLE INT,
    PKG_PRICE INT NOT NULL,
    CONSTRAINT fk_PKGPLANDETAILS_PKG FOREIGN KEY(PKG_PLAN_NO) REFERENCES PKG_PLAN(PKG_PLAN_NO)
);

 INSERT INTO PKG_PLAN_DETAILS(
     PKG_PLAN_NO,
     PKG_DAY_START,
     PKG_DAY_END,
     PKG_PEOPLE_MAX,
     PKG_PEOPLE,
     PKG_PRICE
 ) VALUES('1','2023-08-01 09:00:00','2023-07-30 23:59:59','40','0','5000'),
 ('1','2023-08-03 09:00:00','2023-08-01 23:59:59','50','0','4000'),
 ('1','2023-08-05 09:00:00','2023-08-03 23:59:59','50','2','4000');
 
 --  4.行程(凰瑋)----
 
-- -----------------------------------------------------
-- Table PKG_SHOP_CART
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`PKG_SHOP_CART` (
  `MEM_NO` INT NOT NULL,
  `PKG_DETAILS_NO` INT NOT NULL,
  `PKG_QTY` INT NOT NULL,
  PRIMARY KEY (`MEM_NO`,`PKG_DETAILS_NO`),
  CONSTRAINT `FK_PKGSHOPCART_MEM`
    FOREIGN KEY (`MEM_NO`)
    REFERENCES `FLYDAY`.`MEM` (`MEM_NO`),
  CONSTRAINT `FK_PKGSHOPCART_PKGPLANDETAILS`
    FOREIGN KEY (`PKG_DETAILS_NO`)
    REFERENCES `FLYDAY`.`PKG_PLAN_DETAILS` (`PKG_DETAILS_NO`)
  )
  DEFAULT CHARACTER SET = utf8mb4;
  
  
-- -----------------------------------------------------
-- Table PKG_ORD //外來鍵另外放
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`PKG_ORD` (
  `PKG_ORD_NO` INT NOT NULL AUTO_INCREMENT,
  `MEM_NO` INT NOT NULL,
  `MEM_PKG_COUP_NO` INT,
  `PKG_ORG_PRICE` INT NOT NULL,
  `PKG_DISC_PRICE` INT NOT NULL DEFAULT(0),
  `PKG_PAY_PRICE` INT NOT NULL,
  `CON_NAME` VARCHAR(30) NOT NULL,
  `CON_PHONE` VARCHAR(10) NOT NULL,
  `CON_EMAIL` VARCHAR(40) NOT NULL,
  `PKG_ORDER_DATE` DATETIME NOT NULL,
  `PKG_REFUND_DATE` DATETIME,
  `ORDER_STATE` TINYINT NOT NULL DEFAULT (0) COMMENT '0:已付款, 1:取消訂單，退款處理中, 2:已退款',
  PRIMARY KEY (`PKG_ORD_NO`),
  CONSTRAINT `FK_PKGORD_MEM`
    FOREIGN KEY (`MEM_NO`)
    REFERENCES `FLYDAY`.`MEM` (`MEM_NO`)
    
  )
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table PKG_ORD_DETAILS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`PKG_ORD_DETAILS` (
  `PKG_ORD_NO` INT NOT NULL,
  `PKG_DETAILS_NO` INT NOT NULL,
  `PKG_ORD_QTY` INT NOT NULL,
  `PKG_UNITPRICE` INT NOT NULL,
  `ORDER_NOTE` VARCHAR(300),
  PRIMARY KEY (`PKG_ORD_NO`,`PKG_DETAILS_NO`),
  CONSTRAINT `FK_PKGORDDETAILS_PKGORD`
    FOREIGN KEY (`PKG_ORD_NO`)
    REFERENCES `FLYDAY`.`PKG_ORD` (`PKG_ORD_NO`),
  CONSTRAINT `FK_PKGORDDETAILS_PKGPLANDETAILS`
    FOREIGN KEY (`PKG_DETAILS_NO`)
    REFERENCES `FLYDAY`.`PKG_PLAN_DETAILS` (`PKG_DETAILS_NO`)
  )
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table PKG_COUP
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`PKG_COUP` (
  `PKG_COUP_NO` INT NOT NULL AUTO_INCREMENT,
  `PKG_COUP_NAME` VARCHAR(40) NOT NULL,
  `PKG_COUP_INTRODUCE` VARCHAR(300) NOT NULL,
  `PKG_COUP_DISCOUNT` INT NOT NULL,
  `PKG_COUP_STARTDATE` DATE NOT NULL,
  `PKG_COUP_ENDDATE` DATE NOT NULL,
  `PKG_COUP_USE_STARTDATE` DATE NOT NULL,
  `PKG_COUP_USE_ENDDATE` DATE NOT NULL,
  `PKG_COUP_MINICHARGE` INT NOT NULL,
  `PKG_COUP_STATE` TINYINT NOT NULL DEFAULT (1) COMMENT '0:未上架, 1:已上架',
  PRIMARY KEY (`PKG_COUP_NO`))
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table MEM_PKG_COUP
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`MEM_PKG_COUP` (
  `MEM_PKG_COUP_NO` INT NOT NULL AUTO_INCREMENT,
  `PKG_COUP_NO` INT NOT NULL,
  `MEM_NO` INT NOT NULL,
  `MEM_PKG_COUP_STATE` TINYINT NOT NULL DEFAULT (0) COMMENT '0:未使用, 1:已使用',
  PRIMARY KEY (`MEM_PKG_COUP_NO`),
  CONSTRAINT `FK_MEMPKGCOUP_PKGCOUP`
    FOREIGN KEY (`PKG_COUP_NO`)
    REFERENCES `FLYDAY`.`PKG_COUP` (`PKG_COUP_NO`),
  CONSTRAINT `FK_MEMPKGCOUP_MEM`
    FOREIGN KEY (`MEM_NO`)
    REFERENCES `FLYDAY`.`MEM` (`MEM_NO`)
  )
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table MEM_PKG_COL
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`MEM_PKG_COL` (
  `MEM_NO` INT NOT NULL,
  `PKG_NO` INT NOT NULL,
  PRIMARY KEY (`MEM_NO`,`PKG_NO`),
  CONSTRAINT `FK_MEMPKGCOL_MEM`
    FOREIGN KEY(`MEM_NO`)
    REFERENCES `FLYDAY`.`MEM` (`MEM_NO`),
  CONSTRAINT `FK_MEMPKGCOL_PKG`
    FOREIGN KEY(`PKG_NO`)
    REFERENCES `FLYDAY`.`PKG` (`PKG_NO`)
  )
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table PKG_COMMENT
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FLYDAY`.`PKG_COMMENT` (
  `PKG_COMMENT_NO` INT NOT NULL AUTO_INCREMENT,
  `PKG_NO` INT NOT NULL,
  `MEM_NO` INT NOT NULL,
  `PKG_COMMENTS` VARCHAR(300),
  `PKG_COMMENT_IMG` LONGBLOB,
  `PKG_COMMENT_RATE` TINYINT NOT NULL DEFAULT (4) COMMENT '0:一星, 1:二星, 2:三星, 3:四星, 4:五星',
  `PKG_COMMENT_DATE` DATE NOT NULL,
  PRIMARY KEY (`PKG_COMMENT_NO`),
  CONSTRAINT `FK_PKGCOMMENT_PKG`
    FOREIGN KEY(`PKG_NO`)
    REFERENCES `FLYDAY`.`PKG` (`PKG_NO`),
  CONSTRAINT `FK_PKGCOMMENT_MEM`
    FOREIGN KEY(`MEM_NO`)
    REFERENCES `FLYDAY`.`MEM` (`MEM_NO`)
  )
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- insert 指令 PKG_SHOP_CART 行程購物車
-- -----------------------------------------------------

INSERT INTO PKG_SHOP_CART(
MEM_NO,
PKG_DETAILS_NO,
PKG_QTY
)
VALUES
(1,1,3),
(2,2,4),
(3,3,5);

-- -----------------------------------------------------
-- insert 指令 PKG_ORD 行程訂單
-- -----------------------------------------------------
INSERT INTO `PKG_ORD`(
MEM_NO,
MEM_PKG_COUP_NO,
PKG_ORG_PRICE,
PKG_DISC_PRICE,
PKG_PAY_PRICE,
CON_NAME,
CON_PHONE,
CON_EMAIL,
PKG_ORDER_DATE,
PKG_REFUND_DATE,
ORDER_STATE
)
VALUES 
(1,1,1000,100,900,'蠟筆小新','0912345678','a12345@gmail.com','2021-11-28 00:27:51','2021-11-30 00:03:51',0),
(2,2,2000,200,1800,'小白','0932345679','b23345@gmail.com','2023-07-27 00:27:51','2023-07-28 00:03:51',0),
(3,3,3000,300,2700,'野原廣志','0945345679','c67845@gmail.com','2023-06-27 00:27:51','2023-06-28 00:03:51',2);

-- -----------------------------------------------------
-- insert 指令 PKG_ORD_DETAILS 行程訂單明細
-- -----------------------------------------------------
INSERT INTO PKG_ORD_DETAILS(
PKG_ORD_NO,
PKG_DETAILS_NO,
PKG_ORD_QTY,
PKG_UNITPRICE,
ORDER_NOTE
)
VALUES
(1,1,3,800,'大約16:00左右會check-in'),
(2,2,2,1000,'早餐請給三盤肉'),
(3,3,2,1500,'要加一張床');

-- -----------------------------------------------------
-- insert 指令 PKG_COUP 行程優惠券
-- -----------------------------------------------------

INSERT INTO `PKG_COUP`(
PKG_COUP_NAME,
PKG_COUP_INTRODUCE,
PKG_COUP_DISCOUNT,
PKG_COUP_STARTDATE,
PKG_COUP_ENDDATE,
PKG_COUP_USE_STARTDATE,
PKG_COUP_USE_ENDDATE,
PKG_COUP_MINICHARGE,
PKG_COUP_STATE
)
VALUES 
('夏日沁涼全站限時優惠','滿1000折100',100,'2023-07-27','2023-07-28','2023-07-29','2023-08-08',1000,0),
('全站聖誕限時優惠','滿2000折200',200,'2023-12-10','2023-12-20','2023-12-10','2023-12-31',2000,0),
('1111限時優惠','滿1111折111',111,'2023-11-10','2023-11-10','2023-11-11','2023-11-11',1111,1);

-- -----------------------------------------------------
-- insert 指令 MEM_PKG_COUP 會員行程優惠券
-- -----------------------------------------------------

INSERT INTO MEM_PKG_COUP(
PKG_COUP_NO,
MEM_NO,
MEM_PKG_COUP_STATE
)
VALUES 
(1,3,0),
(2,2,0),
(3,1,1);

-- -----------------------------------------------------
-- insert 指令 MEM_PKG_COL 會員收藏行程
-- -----------------------------------------------------

INSERT INTO `MEM_PKG_COL`(
MEM_NO,
PKG_NO
)
VALUES 
(1,1),
(2,2),
(3,3);

-- -----------------------------------------------------
-- insert 指令 PKG_COMMENT 行程評論
-- -----------------------------------------------------

INSERT INTO `PKG_COMMENT`(
PKG_NO,
MEM_NO,
PKG_COMMENTS,
PKG_COMMENT_IMG,
PKG_COMMENT_RATE,
PKG_COMMENT_DATE
)
VALUES
(1,3,'行程讚爆了',null,5,'2023-07-24'),
(2,1,'棒棒棒',null,4,'2023-07-25'),
(3,2,'好玩',null,3,'2023-07-26');

-- -----------------------------------------------------
-- 行程訂單 外來鍵最後新增 (因參照順序問題)
-- -----------------------------------------------------
ALTER TABLE PKG_ORD ADD CONSTRAINT `FK_PKGORD_MEMPKGCOUP` 
FOREIGN KEY (`MEM_PKG_COUP_NO`)
    REFERENCES `FLYDAY`.`MEM_PKG_COUP` (`MEM_PKG_COUP_NO`);
 
-- 5.票券(佳穎)---------
 
 create table TKT (
	TKT_NO int primary key not null auto_increment,
	TKT_NAME varchar(40) not null,
	TKT_STARTDATE datetime not null,
	TKT_ENDDATE datetime not null,
	TKT_INSTRUCTION varchar(500) not null,
	PROD_DESC varchar(5000) not null,
	NOTICE varchar(500) not null,
	HOWUSE varchar(500) not null,
	REFPOLICY varchar(500) not null,
	LOCATION varchar(40) not null,
	ADDRESS varchar(40) not null,
	SC_LATITUDE double not null,
	SC_LONGITUDE double not null,
	SC_HOWARRIVAL varchar(500),
	SC_SERVICEHR varchar(500),
	TKT_STAT tinyint not null default(0) comment '0:未上架, 1:已上架',
	TKT_SORT tinyint not null comment '0:主題樂園, 1:景點門票, 2:水族館, 3:動物園, 4:博物館, 5:美術館, 6:展覽, 7:其他',
	RATETOTAL int not null,
	RATEQTY int not null
);

insert into TKT (
	TKT_NAME,
	TKT_STARTDATE,
	TKT_ENDDATE,
	TKT_INSTRUCTION,
	PROD_DESC,
	NOTICE,
	HOWUSE,
	REFPOLICY,
	LOCATION,
	ADDRESS,
	SC_LATITUDE,
	SC_LONGITUDE,
	SC_HOWARRIVAL,
	SC_SERVICEHR,
	TKT_STAT,
	TKT_SORT,
	RATETOTAL,
	RATEQTY
) values ('屏東海生館門票', '2023-08-01 9:00:00', '2023-12-31 23:59:59', '擁有全亞洲最大的海底隧道\n虛擬實境運動體驗 VR 設施，邀請大家身歷其境', '－ 館區介紹 －\n屏東國立海洋生物博物館\n國立海洋生物博物館位於後灣，是全台灣規模最大的', '國立海洋生物博物館：\n 0 - 5 歲兒童可免費入場\n 身高 115 公分以下的兒童可免費入場 \n虛擬海世界VR體驗館：\n VR 體驗券限定設施包含：飛行劇場', '請於海生館入口處售票櫃檯出示 QRcode', '免費取消！', '國立海洋生物博物館', '屏東縣車城鄉後灣村後灣路2號', '22.046385', '120.698815', '搭乘高鐵：高鐵左營站下車\n搭乘火車：搭乘火車至枋寮火車站下車', '禮拜一 09:00-17:30\n禮拜二 09:00-17:30', '0', '2', '4', '10'),
		 ('雲林劍湖山世界主題樂園門票', '2023-01-01 08:00:00', '2023-12-31 23:59:59', '全亞洲第一個以維京海盜為主題的樂園\n設置適合各種年齡層的設施', '－ 推薦設施 －\n飛天潛艇 G5：\n衝瘋飛車：\n\n－ 小威の海盜村 － \n大船塢：', '患有下列疾病或其他不宜受到過度刺激的遊客，請勿參加此項目\n3 歲以下或身高未達 100 cm之幼兒，可免費入園', '現場請出示 QR code', '交易成立的 1 天（含）之前取消，收取手續費 0%\n交易成立的 7 天之間取消，收取手續費 10%', '劍湖山世界主題樂園', '雲林縣古坑鄉67號', '23.61752626656129', '120.57945761376594', 'null', 'null', '1', '0', '4.5', '10'),
         ('台南｜奇美博物館', '2023-07-01 12:00:00', '2023-10-31 23:59:59', '七大展廳\n奇美博物館推出以希臘神話為主題的實境遊戲', '－ 場館資訊 －\n－ 展覽介紹 －\n常設展：', '館內禁止飲食、拍照、穿著拖鞋、攜帶寵物\n展廳出口處可蓋重覆入館章', '現場請出示 QR code', '免費取消！', '奇美博物館', '台南市仁德區文華路二段66號', '22.934747857943407', '120.22797665851645', 'null', '週一至週日 09:30–17:30（每週三固定公休）', '1', '4', '5', '1');

---------------------------------------------------------------------------------------------
-- drop table TKT_PLAN;
create table TKT_PLAN (
	TKT_PLAN_NO int primary key not null auto_increment,
	TKT_NO int not null,
    PLAN_NAME varchar(40) not null,
	PLAN_CONTENT varchar(500) not null,
	SOLD_AMOUNT int default(0) not null,
	PLAN_STAT tinyint not null default(0) comment '0:未上架, 1:已上架'   
);       

insert into TKT_PLAN (
	TKT_NO,
	PLAN_NAME,
	PLAN_CONTENT,
	SOLD_AMOUNT,
	PLAN_STAT
) values ('1', '2023年海生館門票', '優待票：6 歲以上或身高 115 cm以上之學童、大學生(含)以上持學生證者適用\n全票：', '0', '0'),
		 ('2', '一般票', '時間：8:00-17:00', '10', '1'),
		 ('2', '星光票', '時間：17:00-22:00', '5', '1'),
		 ('3', '常設展', '全票：\n優惠票：\n', '8', '1'),
		 ('3', '特展', '全票：\n優惠票：\n', '10', '0');
         
-- foreign key 先註解
alter table TKT_PLAN add constraint fk_tktplan_tkt foreign key(TKT_NO) references TKT(TKT_NO);

---------------------------------------------------------------------------------------------
-- drop table TKT_TYPE;
create table TKT_TYPE (
	TKT_TYPE_NO int primary key not null auto_increment,
	TKT_PLAN_NO int not null,
	TKT_TYPE varchar(10) not null,
	PRICE int not null
);

insert into TKT_TYPE (
	TKT_PLAN_NO,
	TKT_TYPE,
	PRICE
) values ('1', '每人', '200'),
		 ('2', '成人票', '300'),
		 ('2', '學生票', '250'),
		 ('3', '成人票', '250'),
		 ('3', '學生票', '200'),
		 ('4', '成人票', '200'),
		 ('4', '兒童票', '100'),
		 ('5', '成人票', '300'),
		 ('5', '兒童票', '150'),
		 ('5', '學生票', '200');

-- foreign key 先註解
alter table TKT_TYPE add constraint fk_tkttype_tktplan foreign key(TKT_PLAN_NO) references TKT_PLAN(TKT_PLAN_NO);

---------------------------------------------------------------------------------------------
-- drop table TKT_IMG;
create table TKT_IMG (
	TKT_IMG_NO int primary key not null auto_increment,
	TKT_NO int not null,
	TKT_IMG longblob
);

insert into TKT_IMG (
	TKT_NO,
	TKT_IMG
) values ('1', null),
		 ('2', null),
		 ('2', null),
		 ('3', null),
		 ('3', null);

-- foreign key 先註解
alter table TKT_IMG add constraint fk_tktimg_tkt foreign key(TKT_NO) references TKT(TKT_NO);

---------------------------------------------------------------------------------------------
-- drop table TKT_COMMENT;
create table TKT_COMMENT (
	TKT_COMMENT_NO int primary key not null auto_increment,
	TKT_NO int not null,
	MEM_NO int not null,
	COMMENTS varchar(300),
	COMMENT_IMG longblob,
	COMMENT_RATE tinyint not null comment '0:一星, 1:二星, 2:三星, 3:四星, 4:五星',
	COMMENT_DATE date not null
);

insert into TKT_COMMENT (
	TKT_NO,
	MEM_NO,
	COMMENTS,
	COMMENT_IMG,
	COMMENT_RATE,
    COMMENT_DATE
) values ('3', '001', 'null', null, '2', current_date()),
		 ('2', '001', '好玩', null, '3', current_date()),
		 ('2', '002', '館藏豐富，空間很大！', null, '4', current_date());

-- foreign key 先註解
alter table TKT_COMMENT add constraint fk_tktcomment_tkt foreign key(TKT_NO) references TKT(TKT_NO);
alter table TKT_COMMENT add constraint fk_tktcomment_mem foreign key(MEM_NO) references MEM(MEM_NO); 
        
---------------------------------------------------------------------------------------------
-- drop table TKT_COUP;
create table TKT_COUP (
	TKT_COUP_NO int primary key not null auto_increment,
	COUP_NAME varchar(40) not null,
	COUP_INTRODUCE varchar(300) not null,
	COUP_DISCOUNT int not null,
	COUP_STARTDATE date not null,
	COUP_ENDDATE date not null,
	USE_STARTDATE date not null,
	USE_ENDDATE date not null,
	MINI_CHARGE int not null,
	COUP_STAT tinyint not null default(0) comment '0:未上架, 1:已上架'
);

insert into TKT_COUP (
	COUP_NAME,
	COUP_INTRODUCE,
	COUP_DISCOUNT,
	COUP_STARTDATE,
	COUP_ENDDATE,
	USE_STARTDATE,
	USE_ENDDATE,
	MINI_CHARGE,
	COUP_STAT
) values ('折NT$100', '期間限定', '100', '2023-08-01', '2023-08-15', '2023-08-01', '2023-08-31', '0', '0'),
		 ('折NT$50', '消費滿500可折抵NT$50', '50', '2023-08-01', '2023-10-15', '2023-08-01', '2023-10-31', '500', '1');

---------------------------------------------------------------------------------------------
-- drop table MEM_TKT_COUP;
create table MEM_TKT_COUP (
	MEM_TKT_COUP_NO int primary key not null auto_increment,
	TKT_COUP_NO int not null,
	MEM_NO int not null,
	COUP_USAGESTAT tinyint not null default(0) comment '0:未使用, 1:已使用'
);

insert into MEM_TKT_COUP (
	TKT_COUP_NO,
	MEM_NO,
	COUP_USAGESTAT
) values ('1', '1', '0'),
		 ('2', '1', '0'),
		 ('2', '2', '1'),
		 ('1', '3', '0'),
		 ('2', '3', '1');
         
-- foreign key 先註解
alter table MEM_TKT_COUP add constraint fk_memtktcoup_tktcoup foreign key(TKT_COUP_NO) references TKT_COUP(TKT_COUP_NO);
alter table MEM_TKT_COUP add constraint fk_memtktcoup_mem foreign key(MEM_NO) references MEM(MEM_NO); 

-- 5.票券(梓倢)----------------------

-- 票券購物車
create table TKT_SHOP_CART (
MEM_NO int not null,
TKT_TYPE_NO int not null,
TKT_QTY int not null,
primary key (MEM_NO, TKT_TYPE_NO)
);

-- 此為FK，合併後再執行
alter table TKT_SHOP_CART add constraint FK_SHOPCART_MEM
foreign key (MEM_NO) references MEM(MEM_NO);
alter table TKT_SHOP_CART add constraint FK_SHOPCART_TYPE
foreign key (TKT_TYPE_NO) references TKT_TYPE(TKT_TYPE_NO);

-- 假資料
insert into TKT_SHOP_CART (MEM_NO, TKT_TYPE_NO, TKT_QTY)
values (1, 1, 3),
	(1, 2, 1),
	(2, 1, 1),
	(2, 2, 2);

-- 票卷訂單
create table TKT_ORD (
TKT_ORD_NO int not null auto_increment primary key,
MEM_NO int not null,
MEM_TKT_COUP_NO int,
ORG_PRICE int not null,
DISC_PRICE int not null default(0),
PAY_PRICE int not null,
CON_NAME varchar(30) not null,
CON_PHONE varchar(10) not null,
CON_EMAIL varchar(40) not null,
ORD_DATE datetime not null,
ORD_REFDATE datetime,
ORD_STAT tinyint not null default(0) comment '0: 已付款, 1: 取消訂單，退款處理中, 2: 已退款'
);

-- 此為FK，合併後再執行
alter table TKT_ORD add constraint FK_ORD_MEM
foreign key (MEM_NO) references MEM(MEM_NO);
alter table TKT_ORD add constraint FK_ORD_COUP
foreign key (MEM_TKT_COUP_NO) references MEM_TKT_COUP(MEM_TKT_COUP_NO);

-- 假資料
insert into TKT_ORD (MEM_NO, MEM_TKT_COUP_NO, ORG_PRICE, DISC_PRICE, 
PAY_PRICE, CON_NAME, CON_PHONE, CON_EMAIL, ORD_DATE, ORD_REFDATE, ORD_STAT)
values (1, null, 750, default, 750, 'Hazel', '1234567890', '111@gmail.com', '2023-7-30', '2023-7-31', 2),
	(2, 1, 500, 30, 470, 'William', '2345678901', '222@gmail.com', '2023-7-31',null, default);

-- 票券訂單明細
create table TKT_ORD_DETAILS (
TKT_ORD_NO int not null,
TKT_TYPE_NO int not null,
TKT_ORD_QTY int not null,
UNIT_PRICE int not null,
COMMENT_STAT tinyint not null default(0) comment '0: 未評論, 1: 已評論',
primary key (TKT_ORD_NO, TKT_TYPE_NO)
);

-- 此為FK，合併後再執行
alter table TKT_ORD_DETAILS add constraint FK_ORDDET_ORD
foreign key (TKT_ORD_NO) references TKT_ORD(TKT_ORD_NO);
alter table TKT_ORD_DETAILS add constraint FK_ORDDET_TYPE
foreign key (TKT_TYPE_NO) references TKT_TYPE(TKT_TYPE_NO);

-- 假資料 
insert into TKT_ORD_DETAILS (TKT_ORD_NO, TKT_TYPE_NO, TKT_ORD_QTY, UNIT_PRICE, COMMENT_STAT)
values (1, 1, 3, 200, 1),
	(1, 2, 1, 150, default),
	(2, 1, 1, 200, default),
	(2, 2, 2, 150, 1);

-- 會員收藏票券
create table MEM_TKT_COL (
MEM_NO int not null,
TKT_NO int not null,
primary key (MEM_NO, TKT_NO)
);

-- 此為FK，合併後再執行
alter table MEM_TKT_COL add constraint FK_COL_MEM
foreign key (MEM_NO) references MEM(MEM_NO);
alter table MEM_TKT_COL add constraint FK_COL_TKT
foreign key (TKT_NO) references TKT(TKT_NO);

-- 假資料
insert into MEM_TKT_COL (MEM_NO, TKT_NO)
values (1, 2),
	(2, 3);

-- 持有票券
create table TKT_PASS(
TKT_PASS_NO int not null auto_increment primary key,
TKT_TYPE_NO int not null,
MEM_NO int not null,
QRCODE varchar(100) not null unique key,
EXP_DATE date not null
);

-- 此為FK，合併後再執行
alter table TKT_PASS add constraint FK_PASS_TYPE
foreign key (TKT_TYPE_NO) references TKT_TYPE(TKT_TYPE_NO);
alter table TKT_PASS add constraint FK_PASS_MEM
foreign key (MEM_NO) references MEM(MEM_NO);

-- 假資料
insert into TKT_PASS (TKT_TYPE_NO, MEM_NO, QRCODE, EXP_DATE)
values (1, 1, '11111111', '2023-8-30'),
	(1, 1, '11111112', '2023-8-30'),
    (1, 1, '11111113', '2023-8-30'),
	(2, 1, '22222221', '2023-8-30'),
    (1, 2, '11111114', '2023-9-1'),
    (2, 2, '22222222', '2023-9-1'),
    (2, 2, '22222223', '2023-9-1');
 
-- 6.揪團 -------------------------------

CREATE TABLE
    ACT(
        ACT_NO INT NOT NULL AUTO_INCREMENT,
        MEM_NO INT NOT NULL,
        PKG_NO INT NOT NULL,
        ACT_TITLE VARCHAR(50) NOT NULL,
        ACT_CONTENT VARCHAR(800) NOT NULL,
        ACT_MAX_COUNT INT NOT NULL,
        ACT_MIN_COUNT INT NOT NULL,
        ACT_CURRENT_COUNT INT NOT NULL,
        ACT_JOIN_BEGIN TIMESTAMP NOT NULL,
        ACT_JOIN_END TIMESTAMP NOT NULL,
        ACT_STATUS TINYINT NOT NULL DEFAULT(0) COMMENT '0:揪團中，1: 已成團，2: 已取消',
        CONSTRAINT PK PRIMARY KEY (ACT_NO),
        CONSTRAINT FOREIGN KEY(PKG_NO) REFERENCES PKG(PKG_NO),
        CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO)
    );
 ALTER TABLE ACT MODIFY ACT_JOIN_END TIMESTAMP;
INSERT INTO
    ACT (
        MEM_NO,
        PKG_NO,
        ACT_TITLE,
        ACT_CONTENT,
        ACT_MAX_COUNT,
        ACT_MIN_COUNT,
        ACT_CURRENT_COUNT,
        ACT_JOIN_BEGIN,
        ACT_JOIN_END,
        ACT_STATUS
    )
VALUES 
( 1,1,'旅遊一','快樂出遊一',10,5,0,'2023-07-25','2023-08-30', 0), 
(2,2,'旅遊二','快樂出遊二',20,10,0,'2023-08-25','2023-09-30',0), 
(3, 3,'旅遊三','快樂出遊三',30,15,0,'2023-09-25','2023-10-30',0);

CREATE TABLE
    ACT_JOIN(
        ACT_NO INT NOT NULL,
        MEM_NO INT NOT NULL,
        JOIN_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        JOIN_STATUS TINYINT NOT NULL DEFAULT(0) COMMENT '0:待審核，1: 審核通過，2: 審核不通過，3: 取消',
        CONSTRAINT PK PRIMARY KEY (ACT_NO, MEM_NO),
        CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO),
        CONSTRAINT FOREIGN KEY(ACT_NO) REFERENCES ACT(ACT_NO)
    );

INSERT INTO
    ACT_JOIN(
        ACT_NO,
        MEM_NO,
        JOIN_STATUS
    )
    VALUES
    (1,1,0),
    (2,2,1),
    (3,3,2);

CREATE TABLE
    ACT_REPLY(
        ACT_REPLY_NO INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ACT_NO INT NOT NULL,
        REPLY_CONTENT VARCHAR(800) NOT NULL,
        MEM_NO INT NOT NULL,
        ACT_REPLY_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ACT_REPLY_STATUS TINYINT NOT NULL DEFAULT(0) COMMENT '0：正常，1：已刪除',
        CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO),
        CONSTRAINT FOREIGN KEY(ACT_NO) REFERENCES ACT_JOIN(ACT_NO)
    );
    INSERT INTO 
    ACT_REPLY(
        ACT_NO,
        REPLY_CONTENT,
        MEM_NO,
        ACT_REPLY_STATUS
    )
    VALUES
    (1,'請問可以帶小孩參加嗎?',1,0),
    (1,'我可以帶冰箱去嗎?',2,0),
    (1,'請問可以免費參加嗎?',3,0);

CREATE TABLE
    RP_GROUP (
        RP_GROUP_NO INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        MEM_NO INT NOT NULL,
        ACT_NO INT NOT NULL,
        RP_GROUP_REASON TINYINT NOT NULL DEFAULT(0) COMMENT '0:活動內容與標題不符，1:言論違反善良風俗，2:騷擾行為，3:其他',
        RP_GROUP_CONTENT VARCHAR(500) not null,
        RP_GROUP_TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        EMP_NO INT,
        RP_GROUP_DONE_TIME DATETIME,
        RP_GROUP_STATUS TINYINT NOT NULL DEFAULT(0) COMMENT '0: 未處理，1: 通過，2: 不通過',
        RP_GROUP_NOTE VARCHAR(800),
        CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO),
        CONSTRAINT FOREIGN KEY(ACT_NO) REFERENCES ACT_JOIN(ACT_NO),
        CONSTRAINT FOREIGN KEY(EMP_NO) REFERENCES EMP(EMP_NO)
    );

INSERT INTO
    RP_GROUP(
        MEM_NO,
        ACT_NO,
        RP_GROUP_REASON,
        RP_GROUP_CONTENT,
        RP_GROUP_DONE_TIME,
        RP_GROUP_STATUS,
        RP_GROUP_NOTE
    )
VALUES 
( 1,1,0,'非法交易','2023-07-30', 1,'確認為非法交易'), 
(2,2,2,'METOO性騷擾',NULL,0,'待審核'), 
(3,3,1,'亂罵民進黨','2023-07-26',2,'民進黨本該就可以批評'); 
 
-- 7.通知&訊息 --------------------

CREATE TABLE STORE_NOTIFY(
	STORE_NOTIFY_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	MSG VARCHAR(500) NOT NULL,
    MSG_IMG  LONGBLOB,
	MSG_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    STORE_NO INT NOT NULL ,
    READ_STAT TINYINT NOT NULL DEFAULT(0) COMMENT '0:未閱讀訊息，1: 已閱讀訊息',
	CONSTRAINT  FOREIGN KEY(STORE_NO) REFERENCES STORE(STORE_NO)
);

INSERT INTO  STORE_NOTIFY (
	MSG,
    MSG_IMG,
	MSG_TIME,
	STORE_NO,
	READ_STAT
    
) VALUES ('已收到訂單',null,'2023-07-30 09:49:45','1','0'),
		('颱風即將登陸，水上活動全面取消',null,'2023-07-31 20:29:15','2','1'),
        ('下周有新行程上架，敬請期待',null,'2023-06-11 10:49:25','3','0');
------------------------------------------------------------------------

CREATE TABLE MEM_NOTIFY(
	MEM_NOTIFY_NO INT AUTO_INCREMENT NOT NULL  PRIMARY KEY,
	MSG VARCHAR(500) NOT NULL,
	MSG_IMG  LONGBLOB,
	MSG_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	MEM_NO INT NOT NULL,
	READ_STAT TINYINT NOT NULL DEFAULT(0) COMMENT '0:未閱讀訊息，1: 已閱讀訊息',
	CONSTRAINT  FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO)
);

INSERT INTO MEM_NOTIFY(
	MSG,
    MSG_IMG,
    MSG_TIME,
    MEM_NO,
    READ_STAT
    
) VALUES ('您的優惠券即將到期',null,'2023-07-11 20:19:25','1','0'),
		('下周有行程即將開始，請提早準備',null,'2023-07-21 15:19:05','2','1'),
        ('購物車內尚有未結帳商品，請盡早結帳',null,'2023-05-21 05:29:36','3','0');
------------------------------------------------------------------------

CREATE TABLE MEM_STORE_SERVICE(
	MSG_ID INT AUTO_INCREMENT NOT NULL  PRIMARY KEY, 
	STORE_NO INT NOT NULL ,
	MEM_NO INT NOT NULL,
    MSG_CONTENT VARCHAR(800) NOT NULL,
    MSG_DIRECTIONS TINYINT NOT NULL DEFAULT(0) COMMENT '0：會員對廠商，1：廠商對會員',
	MSG_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FOREIGN KEY(STORE_NO) REFERENCES STORE(STORE_NO),
	CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO)
);

INSERT INTO MEM_STORE_SERVICE(
	STORE_NO,
    MEM_NO,
    MSG_CONTENT,
    MSG_DIRECTIONS,
    MSG_TIME
    
) VALUES('1','1','請問行程一有含住宿嗎?','0','2023-07-12 20:19:15'),
		('2','2','請問行程二有含早餐嗎?','1','2023-07-16 09:37:25'),
		('3','3','請問行程三有含diy活動嗎?','1','2023-05-16 09:29:52');
    ------------------------------------------------------------------------

CREATE TABLE MEM_PLATFORM_SERVICE(
	MSG_ID INT AUTO_INCREMENT NOT NULL  PRIMARY KEY, 
	EMP_NO INT NOT NULL ,
	MEM_NO INT NOT NULL ,
    MSG_CONTENT VARCHAR(800) NOT NULL,
    MSG_DIRECTIONS TINYINT NOT NULL DEFAULT(0) COMMENT '0：會員對平台，1：平台對會員',
	MSG_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FOREIGN KEY(EMP_NO) REFERENCES EMP(EMP_NO),
	CONSTRAINT FOREIGN KEY(MEM_NO) REFERENCES MEM(MEM_NO)
    );

INSERT INTO MEM_PLATFORM_SERVICE(
	EMP_NO,
	MEM_NO,
    MSG_CONTENT,
	MSG_DIRECTIONS,
    MSG_TIME
    
) VALUES('1','1','我要更改會員手機號碼，請問如何更改?','0','2023-07-26 11:39:25'),
		('2','2','我要更改會員信箱地址，請問如何更改?','1','2023-07-18 16:29:18'),
		('3','3','我要更改會員居住地址，請問如何更改?','1','2023-07-28 14:36:55'); 
 
-- 0.公告&檔期--------- 

create table ANN (
	ANN_NO int primary key not null auto_increment,
    ANN_TEXT varchar(100),
    ANN_PIC longblob,
    ANN_START_DATE date,
    ANN_END_DATE date
);

insert into ANN(ANN_TEXT, ANN_START_DATE, ANN_END_DATE)
values
("颱風逼近，請密切注意形成是否成行", "2023-08-16", "2023-08-17"),
("快來領優惠券！最高折抵99999元！", "2023-08-18", "2023-08-20"),
("限時加入會員，獲得黃金會員資格！", "2023-08-21", "2023-08-25"),
("老闆不在家，全站打五折", "2023-08-26", "2023-08-26"),
("老闆回家了，全站不打折", "2023-08-27", "2099-08-31");

create table PKG_SALE (
	PKG_SALE_NO int primary key not null auto_increment,
    PKG_SALE_NAME varchar(25),
    PKG_SALE_INFO varchar(100),
    PKG_SALE_START_DATE date,
    PKG_SALE_END_DATE date
);

insert into PKG_SALE(PKG_SALE_NAME, PKG_SALE_INFO, PKG_SALE_START_DATE, PKG_SALE_END_DATE)
values
("夏日炎炎，清涼一夏", "清涼水上活動消暑行程","2023-07-01", "2023-08-31"),
("限時七折！ 台灣離島小旅行！", "探索離島秘境，認識在地人文景觀", "2023-09-01", "2023-09-15"),
("城市旅遊限定！不用千里迢迢也能說走就走的旅行！", "夜半魚市場、漫遊林森北，解鎖你不知道的都市景象", "2023-09-16", "2023-12-31"),
("走入山海，無痕旅行！", "用最環保的方式體驗最自然的行程！", "2023-08-01", "2023-08-31"),
("勇闖大台中！槍林彈雨體驗！", "中部粽製作，冷凍水餃製作，海線小吃都在這！", "2024-01-01", "2024-01-30");

create table PKG_SALE_DETAIL (
	PKG_SALE_NO int,
    PKG_NO int
);

alter table PKG_SALE_DETAIL add constraint primary key(PKG_SALE_NO, PKG_NO);
alter table PKG_SALE_DETAIL add constraint fk_PKG_SALE_DETAIL_PKG_SALE foreign key (PKG_SALE_NO) references PKG_SALE(PKG_SALE_NO);
alter table PKG_SALE_DETAIL add constraint fk_PKG_SALE_DETAIL_PKG foreign key (PKG_NO) references PKG(PKG_NO);

insert into PKG_SALE_DETAIL(PKG_SALE_NO, PKG_NO)
values
(1,1),
(1,2),
(2,3),
(3,2),
(3,3),
(4,2);

create table TKT_SALE (
	TKT_SALE_NO int primary key not null auto_increment,
    TKT_SALE_NAME varchar(25),
    TKT_SALE_INFO varchar(100),
    TKT_SALE_START_DATE date,
    TKT_SALE_END_DATE date
);

insert into TKT_SALE(TKT_SALE_NAME, TKT_SALE_INFO, TKT_SALE_START_DATE, TKT_SALE_END_DATE)
values
("清涼一夏，水上樂園門票！", "台灣最好玩的水上樂園都在這！", "2023-07-01", "2023-08-31"),
("絕對驚悚！鬼屋大集合！", "集結全台鬼怪故事，嚇死人不償命！", "2023-09-01", "2023-09-15"),
("熱門展覽", "炎炎夏日，舒適的吹冷氣看展覽充實身心靈吧！", "2023-09-16", "2023-10-31"),
("熱門動物明星", "最Q動物大集合，可愛動物療癒你一天！", "2023-08-01", "2023-10-31"),
("台北精選美術展", "享受精彩的國內外藝術，只要在台北就看的到！", "2023-10-16", "2023-12-31");

create table TKT_SALE_DETAIL (
	TKT_SALE_NO int,
    TKT_NO int
);

alter table TKT_SALE_DETAIL add constraint primary key(TKT_SALE_NO, TKT_NO);
alter table TKT_SALE_DETAIL add constraint fk_TKT_SALE_DETAIL_TKT_SALE foreign key (TKT_SALE_NO) references TKT_SALE(TKT_SALE_NO);
alter table TKT_SALE_DETAIL add constraint fk_TKT_SALE_DETAIL_TKT foreign key (TKT_NO) references TKT(TKT_NO);

insert into TKT_SALE_DETAIL(TKT_SALE_NO, TKT_NO)
values
(1,1),
(1,2),
(1,3),
(2,1),
(2,2),
(3,3),
(4,1),
(4,2);
