# :pushpin: Tripllo

> Trello Clone, 계획 공유 서비스
>
> <a>https://tripllo.tech</a>

<br/>

## 1. 제작 기간 & 참여 인원

- 2020년 12월 7일 ~ 2021년 2월 15일
- 개인 프로젝트

<br/>

## 2. 사용 기술

`Front-end`

- Vue 2.6.11 + Vuex + Vue-router
- scss
- axios
- dragula [(https://bevacqua.github.io/dragula/)](https://bevacqua.github.io/dragula/)
- sockjs-client

`Back-end`

- Java 8
- SpringBoot 2.1.9
- Gradle
- MyBatis
- H2
- Mysql 8.0.22
- Spring Security
- Swagger 2

<br/>

## 3. ERD 설계

![tripllo](https://user-images.githubusercontent.com/59427983/108009279-b19f6600-7045-11eb-998a-8a1b0fdd3eb4.png)

<br/>

## 4. 핵심 기능

- 계획 등록
- 사용자 초대



<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">

### 4.1 전체 흐름
![전체 프로세스](https://user-images.githubusercontent.com/59427983/108020126-06030f80-705f-11eb-934d-d115b3e90e20.jpg)

### 4.2 계획 등록

- **화면 랜더링**
  - Action 함수 호출 후 Component를 다시 그려줄 수 있는 Action 함수를 호출합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_vue/blob/d83f89c1f799b4281fcf43d8a40242991fb7afb2/src/store/actions.js#L158)
  - 1:N 관계를 가진 컴포넌트가 쿼리문으로 조회 된 후 리랜더링 됩니다.  :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/77266edb3c874cd43132425e75a587641e4983fd/src/main/resources/mapper/BoardMapper.xml#L195)
- **카드 기능**
  - Location(구글맵 API) :pushpin: 

### 4.2 뭐무머ㅝ

</div>
</details>

  

  

  

  ### 





<br/>

## 5. 핵심 트러블 슈팅

### 5.1. ㅇㅇㅇ







<br/>

## 6. 그 외 트러블 슈팅



<br/>