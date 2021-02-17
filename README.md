# :pushpin: Tripllo

> Trello Clone, 계획 공유 서비스
>
> 메인 : <a>https://tripllo.tech</a>
>
> 간단 메뉴얼 : https://tripllo.tech/manual

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

<br/>

### 4.2 계획 등록

- **카드 기능**

  - Location(구글맵 API) :pushpin: ​ [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailLocation/LocationMap.vue#L56)

    - 구글맵 API를 사용해서 card에서는 static 이미지를 불러오며 클릭시, 구글맵 전체를 볼 수 있습니다.
    - 구글맵 상세 페이지에서는 해당 Board에서 등록된 모든 location이 지도에 표시되는 클러스터 기능이 포함되어 있습니다.

  - Attachment

    - 파일 업로드 시 local에 파일을 저장 후 S3에 올린 다음 local에 남은 파일을 지웁니다.

    - Spring Cloud AWS를 이용해 S3에 *static_[유저이름]*으로 된 폴더를 생성해 파일을 저장합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/5a0c0d1fd697f5c6ec74d39b4e9f058ac6ab914c/src/main/java/com/pozafly/tripllo/fileUpload/S3Uploader.java#L29)
    - 파일은 권한을 체크하여 다운 받거나 삭제할 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailAttachment/AttachmentList.vue#L48)

  - Checklist

    - KProgress 모듈을 사용해 체크 목록이 변화할 때마다 게이지가 변화합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailChecklists/Checklists.vue#L155)
    - 체크 목록 이름을 변경할 때 이벤트 버블링을 방지합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailChecklists/Checklists.vue#L119)

  - Comments

    - 답글(대댓글)을 위한 group_num, dept 칼럼을 두어 답글을 표현합니다.
    - 삭제 시 댓글에 답글이 없을 경우는 화면에서 사라지지만, 답글이 존재하는 경우 *삭제된 메세지 입니다.* 라고 표시됩니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/5a0c0d1fd697f5c6ec74d39b4e9f058ac6ab914c/src/main/java/com/pozafly/tripllo/comment/service/impl/CommentServiceImpl.java#L91)

  - 그 외 기능(메모 - Description, 라벨링 - Labels, 날짜 지정 - due date)

- **드래그 앤 드롭** :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/utils/dragger/dragger.js#L8)

  - dragula 모듈을 사용해, List와 Card를 드래그해서 위치를 변화시킬 수 있습니다.
  - 대상의 이전 DOM과 다음 DOM을 비교해서 pos(포지션) 값을 지정 후 UPDATE 합니다.

- **화면 랜더링**
- Action 함수 호출 후 Component를 다시 그려줄 수 있는 Action 함수를 호출합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_vue/blob/d83f89c1f799b4281fcf43d8a40242991fb7afb2/src/store/actions.js#L158)
  
- 1:N 관계를 가진 컴포넌트가 쿼리문으로 조회 된 후 리랜더링 됩니다.  :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/77266edb3c874cd43132425e75a587641e4983fd/src/main/resources/mapper/BoardMapper.xml#L195)

<br/>

### 4.3 사용자 초대

- **유저 검색** :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/board/Invite.vue#L44)
  - 모달 창에서 초대하고 싶은 회원의 ID를 검색합니다. filter를 사용해 자신과 이미 초대된 사람은 목록에 뜨지 않습니다.

- **실시간 messaging**
  - sockjs-client로 공통 컴포넌트인 Header.vue에서 Connection을 실행합니다.
  - Spring WebSocket에서 HandshakeInterceptor 를 통해 socket 세션을 받아온 후, 현재 접속자 끼리 초대장을 보낼 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/webSocket/WebSocketHandler.java#L19)
  - Header.vue에서 초대장을 받고, Notification 처리와, 초대장 갯수를 표현합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/common/Header.vue#L161)
- **초대 수락**
  - 접속자가 해당 Board의 초대된 사람 목록에 추가되고, 접속자의 초대 된 Board 목록에 추가 됩니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/common/MessageDetail.vue#L30)
  - 이 때, 초대한 사람의 Board가 수정되어야 하므로 Spring Interceptor에서 권한 체크를 합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/common/interceptor/BoardAuthInterceptor.java#L77)

<br/>

### 4.4 소셜 기능

- 해시태그

  - Array - push, splice를 통해 해시태그를 지정, 삭제할 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/fa0b24d02ad944a63ae18f1734024faebdfab76b/src/components/board/HashtagDisplay.vue#L72)
  - 태그를 조작할 수 있는 display가 Board를 만든 주인에게만 보여집니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/fa0b24d02ad944a63ae18f1734024faebdfab76b/src/views/BoardPage.vue#L62)

  - N:M 관계를 board_has_hashtag 중간 테이블을 두고 1:N 관계로 풀어서 조회합니다.  :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/HashtagMapper.xml#L12)

- 좋아요

  - 조회시, 유저가 해당 Board에 좋아요 클릭 여부를 판단하기 위해 own_like 칼럼을 표현합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/BoardMapper.xml#L23)

</div>
</details>

<br/>

## 5. 핵심 트러블 슈팅

### 5.1. ㅇㅇㅇ

- 배포
  - EC2 access key 노출로 ssh 접속 후, 지속적 끊김 문제
  - Nginx Reverse Proxy 문제
  - Mixed Content 문제
  - Travis로 자동 배포 문제(gradle 버전)
  - 도메인 연결문제
  - aws swap 메모리 문제
- Front
  - Dev 서버가 실행되지 않는 문제
  - 메인 페이지 접속 시 권한 오류
  - JSON.parse 문제
  - vue-google-login 플러그인 문제
  - 좋아요 클릭시 리랜더링 안되는 문제  https://github.com/pozafly/TIL/blob/main/Vue/Vue%20%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4.md
  - 모달 외부 클릭 시 닫힘 문제
  - 비동기 처리 문제
  - Vue 파일 내, Script 로드 문제
  - vue-notification 2번 뜨는 문제
  - lodash debounce 문제
  - vue event 중첩 문제
  - vue key.down 문제
  - 이벤트 버블링 문제
  - recent Board 적용안되는 문제.
  - 소셜 회원일 경우 탈퇴 로직 수정 https://github.com/pozafly/tripllo_vue/commit/89fedc7da913a5c2c3e0608fc795e9589fc7e31a
  - input에 mysql 글자 제한으로 인해 등록되지 않는 문제. https://github.com/pozafly/tripllo_vue/commit/66dc7b573a860f7408de8c41206432a2c1651001
  - display sticky 시, 상위 태그의 height 가 auto 일 경우, 다른 컴포넌트를 붙였을 때 ui가 틀어지는 문제. https://github.com/pozafly/tripllo_vue/commit/783eb1bb54e878723dcf50b59b62c02b7d8f2e17#diff-7fc90d69307bc7762a0461df1157a346ec86251dd8bfbc3bd130d8cb1e590af3 -> 여기 MainPage.vue를 봐라.
  - 무한 스크롤 시 한번 멈춰버리면 다른 탭에서 동작하지 않는 문제. https://github.com/pozafly/tripllo_vue/commit/554baeffb0adb7eb6b82c4c728e5014e218315ad
  - vue의 v-model 로 양방향 바인딩 시, 한글이 한박자 늦게 먹는 문제. https://github.com/pozafly/tripllo_vue/commit/3677c8e915200fbaa9576735499b195667a1a7f2
  - 이벤트 트리거 2번 실행되는 문제. *https://velog.io/@kyh196201/1025* boardpage의 주석 부분
- 공통
  - cors 문제
  - 배포 후 test ID 비밀번호 변경
  - S3 File upload시 local에 파일을 저장할 때, linux 권한 문제
- Back
  - SpringSecurity와 Swagger 문제
  - Gson 문제
  - @PathVariable, @RequestBody 문제
  - AuthenticationPrincipal 현재 접속한 user 문제
  - java 배열 요소 삭제 문제
  - Interceptor 문제
  - 권한. 현존하는 문제. interceptor 스파게티 코드
  - MyBatis selectKey 문제
  - 



<br/>

## 6. 그 외 트러블 슈팅



<br/>