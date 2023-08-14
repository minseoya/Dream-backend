# 44-2nd-Dream-backend 경매 플랫폼 제작 프로젝트


김민서([**Github**](https://github.com/), [회고록](https://just-process.tistory.com/45/))<br>

<br>
> **위코드 44기 2차 프로젝트 <br>
p2p 명품 경매 거래 플랫폼 KREAM을 모델링하여 레고 상품 p2p 경매 거래 플랫폼 웹사이트 제작<br>
[결과물 시연 영상 링크](https://www.youtube.com/watch?v=UFuS91VcVp8)**

> **짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.<br>
개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.*


## 📍프로젝트 기간 & 인원
* 프로젝트 기간: 2주 (2023.04.20 ~ 2023.05.04)   
* 개발 인원:  
  `Frontend`: 최선영(Product Manager), 김영운, 조건호 <br>
  `Backend`: 박세익(Project Manager), 장다희, 김민서, 송석준 <br>
* [프론트엔드 Github 저장소](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-frontend)
* 모델링한 사이트: [KREAM](https://kream.co.kr/)

<br>


## 📍사용 기술

* BackEnd   

 |JavaScript|Node.js|Jest|MySql|Rest|Prettier|Docker|AWS|
|---|---|---|---|---|---|---|---|
|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /></div>| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/jest-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div>|
<br>

* 협업 <br><br>

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <br>
<img src="https://img.shields.io/badge/trello-0055cc?style=for-the-badge&logo=trello&logoColor=yellow"> <br>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <br>
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=Slack&logoColor=wihte"> <br>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <br>
<br>


 ## 📍[ERD](https://dbdiagram.io/d/64426bdf6b31947051f9b394)
 > User가 구매자이자 판매자가 될 수 있으며, 하나의 Product에 구매 입찰과 판매 입찰이 동시에 이루어진다는 점에 주안점을 두고 데이터베이스 모델 구축 <br><br>
![DREAM (3)](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/b18561e6-0888-4aaa-8eaa-452122d73e11)


 ## 📍[Postman](https://documenter.getpostman.com/view/26858291/2s93eWzskR)
> Postman의 Documentation을 프로젝트 진행 시 프론트엔드와의 소통 및 협업 도구로 활용 <br><br>
<img width="1000" alt="스크린샷 2023-05-18 23 35 50" src="https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/3bff3e11-24d2-495c-81e4-f815da108948"><br>

 <br>
 
 
 # 구현 기능 목록
 

***

### 1. 회원가입 / 로그인(KAKAO Social Login)
- KAKAO에서 제공하는 API를 활용하여 user 회원가입, 로그인 기능을 구현했습니다.

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/acdfa770-73bd-4775-a10a-e924592faed4
 ***
 
 ### 2. 상품 리스트(필터/정렬)
 - query parameter로 필터 및 정렬 조건을 전달 받아, 그에 따라 상품 리스트를 응답하는 API입니다.
- 좋아요 많은 순, 즉시 구매가 순, 즉시 판매가 순, 리뷰 순, 프리미엄 가격 순으로 정렬이 가능합니다.
- 상품 카테고리, 사용 연령, 난이도로 필터 가능합니다.
<br>

 
 <br>
 
  ***
  
### 3. 상품 상세 정보 
- path parameter로 productId를 전달 받아, 해당하는 product의 상세 정보를 응답하는 API입니다.
- 상품명, 모델넘버, 카테고리, 좋아요 수 등 기본 정보 뿐만 아니라, 즉시 구매가, 즉시 판매가, 최근 거래가, 프리미엄 퍼센트 등의 경매가 관련 데이터도 함께 전달합니다.
- 즉시 구매가는 판매 입찰된 금액 중 가장 낮은 금액, 즉시 판매가는 구매 입찰된 금액 중 가장 높은 금액, 최근 거래가는 체결 거래 중 가장 최신 거래의 거래 성사 가격입니다.
프리미엄 퍼센트는 상품 발매가와 최근 거래가의 비율로 계산됩니다.
<br>



 <br>
 
  ***
   
### 4. 입찰 
- 상품 productId, 구매/판매 중 해당하는 입찰 유형, 입찰 금액, 입찰 마감 기한을 request의 body로 전달받아 입찰 내역이 기록되는 API입니다. <br>
- 구매 입찰, 즉시 구매, 판매 입찰, 즉시 판매 네 가지 경우에 모두 사용할 수 있습니다. <br>
- userId는 token의 payload에 저장된 정보를 이용합니다. <br>
- 입찰 금액에 따라 즉시 거래가 성사 될 수 있습니다. <br>
- 즉시 거래가 성사되는 경우, transaction을 사용하여 거래 건 생성, 입찰 상태를 낙찰로 변경, 거래 상대방의 입찰 내역도 낙찰 상태로 변경 등의 처리가 동시에 이루어지도록 했습니다. <br>
- 해당 user와 상품에 대해 기존 입찰 내역이 존재할 경우 '금액' 혹은 '입찰 기한'이 변경되도록 하여, 입찰 건 생성 외에도 입찰 내역 업데이트에 본 API가 사용될 수 있습니다. <br>

 <br>
 
***
 
### 5. 입찰 상세 내역 조회
- 입찰 금액 및 기한 입력 후 이어지는 개인 정보 입력 페이지에서 입찰 내역 확인을 위한 입찰 상세 정보 조회 API입니다.
- path parameter로 상품의 productId를, query parameter로 구매/판매 등의 입찰 유형을 전달 받습니다. userId는 token의 payload에 저장된 정보를 이용합니다.
- 거래 성사 여부에 따라 dealId(거래 Id)와 dealNumber(고유 거래 번호) 전달 여부가 달라집니다. 거래가 성사되지 않고 입찰만 완료된 경우 두 값을 null로 전달합니다.
- 상품에 대한 기본 정보와, 입찰 건의 Id, 입찰 금액, 입찰 기한, 수수료 금액 등을 전달합니다.

 <br>
 
  ***
  
### 6. 누적 입찰 내역 조회
- 최근 체결된 거래 시세를 그래프로 시각적으로 한눈에 볼 수 있음,원하는 기간 내에 이루어진 거래를 선택적으로 볼수 있습니다. <br>
-상품별 입찰된 정보를 확인할수 있습니다

https://github.com/minseoya/Dream-backend/assets/119482288/db8f6674-7c7d-46bb-a598-9fd31cd374d8

 ***
 
### 7. 상품 검색 / 인기 검색어
- keyword에 상품명 또는 basic, building, movie, car 등의 카테고리 명 기입 시 검색됩니다.
- 누적 인기검색어를 조회하는 API입니다.
- 검색 시 키워드별 검색량이 누적됩니다.
- 검색어 데이터를 역대 검색량 순으로 정렬하여 상위 10개의 검색어를 응답합니다.
<br>

 ***
 
 ### 8. 관심상품 등록/삭제, 관심상품 리스트
- path parameter로 productId를 받아 해당 유저의 관심상품으로 등록합니다.
- 동일한 product와 동일한 user에 대해 API가 재실행될 경우 관심상품 삭제 합니다.
- 경매플랫폼이기 때문에 즉시구매가와 함께 관심상품 리스트를 보여줌니다.


https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/e7475a80-6037-4691-aa5d-7af24bbb8110

 <br>
 
  ***
 
 ### 9. 리뷰 CRUD
 - C : multer-3와 multer를 이용하여 s3에 사진을 올려 사진리뷰를 게시 가능하도록 함 <br>
 - R : 리뷰 조회 시 productId를 사용하여 데이터베이스에서 제품에 대한 리뷰를 검색합니다. users 및 review_images 테이블과 LEFT JOIN 하여 데이터를 반환합니다
 - U : 유효한 reviewId인지 확인 후 리뷰가 수정되도록 했습니다.
 - D : 리뷰와 리뷰 이미지 삭제에 대해 transaction 처리 하였습니다.
 
 https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/4a612806-8010-4162-8d5b-fa2b8bff27c5

  
  ***
  
 ### 10. 결제/정산 완료 상태 업데이트 
- 즉시 구매 후 client가 결제 완료 요청을 보내면, 거래 상태를 결제 완료로 업데이트합니다.
- 즉시 판매가 체결되면 구매자의 결제 대기로 상태를 업데이트 합니다.




  
***
 ## Reference

- 이 프로젝트는 [KREAM](https://kream.co.kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
