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

    - Spring Cloud AWS를 이용해 S3에 static_[유저이름] 으로 된 폴더를 생성해 파일을 저장합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/5a0c0d1fd697f5c6ec74d39b4e9f058ac6ab914c/src/main/java/com/pozafly/tripllo/fileUpload/S3Uploader.java#L29)
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

  - Board 조회시, 유저의 좋아요 클릭 여부를 판단하기 위해 own_like 칼럼을 표현합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/BoardMapper.xml#L23)

</div>
</details>

<br/>

## 5. 핵심 트러블 슈팅

### 5.1 무한 스크롤 적용 문제

- Board를 조회 시, 생성된 날짜(createdAt)를 desc 순으로 정렬하고 있는데, 모든 Data를 한번에 들고오는 방식이었습니다.
- 무한 스크롤을 적용하려고 하니 모든 데이터를 한번에 들고 오면 무한 스크롤을 적용하는 것이 의미가 없어집니다.
- 또한 MySQL의 limit와 offset을 사용해 들고오면 모든 DB내 모든 Board 데이터를 조회 후 가져오게 되므로 성능상 문제가 생긴다는 사실을 알게 되었습니다. [커서 기반 페이지네이션](https://velog.io/@minsangk/%EC%BB%A4%EC%84%9C-%EA%B8%B0%EB%B0%98-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-Cursor-based-Pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

<details>
<summary><b>기존코드</b></summary>
<div markdown="1">

```sql
<select id="readPersonalBoardList" parameterType="String" resultType="com.pozafly.tripllo.board.model.Board">
    select
        a.id,
        a.title,
        a.bg_color,
        a.public_yn,
        a.hashtag,
        a.like_count,
        a.created_at,
        a.created_by,
        EXISTS
        (
            select 1
            from board_has_like
            where board_id = a.id and user_id = #{userId}
        ) as own_like
    from board a
    where a.created_by = #{userId}
    order by created_at desc
</select>
```

</div>
</details>

- 커서(기준) 은 정렬하고 있는 대상인 created_at 이며
- MyBatis의 choose when otherwise를 사용하여 처음 조회 시, lastCreateAt 변수에 'firstCall' 문자열로 매개변수를 받아 14개의 데이터만 가지고 가게 만들었으며, 그 후에 lastCreatedAt 변수에 마지막 DOM의 createdAt를 담아서 던지게 되면 otherwise에 걸려 and 조건문을 타게 되는 구조로 변경했습니다.

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

```sql
<select id="readPersonalBoardList" parameterType="Map" resultType="com.pozafly.tripllo.board.model.Board">
    select
        a.id,
        a.title,
        a.bg_color,
        a.public_yn,
        a.hashtag,
        a.like_count,
        a.created_at,
        a.created_by,
        EXISTS
        (
            select 1
            from board_has_like
            where board_id = a.id and user_id = #{userId}
        ) as own_like
    from board a
    where a.created_by = #{userId}
    <choose>
        <when test='"firstCall".equals(lastCreatedAt)'>
            order by created_at desc
            limit 14
        </when>
        <otherwise>
            and created_at <![CDATA[ < ]]> #{lastCreatedAt}
            order by created_at desc
            limit 6
        </otherwise>
    </choose>
</select>
```

</div>
</details>

<details>
<summary><b>Vue templete 코드</b></summary>
<div markdown="1">

- vue-infinite-loading 패키지를 설치하고, lastCreatedAt 변수에 담을 값을 html dataset에 두어 정보를 가져오게 했습니다.

```html
<div class="list-wrap" ref="boardItem">  <!-- 여기 ref 등록해주어야 자식의 마지막 DOM을 가져올 수 있다. -->
  ...
  <div
    class="board-list"
    v-for="board in personalBoardList"
    :key="board.id"
    :data-last-created-at="board.createdAt"  <!-- dataset을 지정해두었음. -->
  >
    <BoardItem :board="board" />
  </div>
</div>
...
<infinite-loading @infinite="infiniteHandler" spinner="waveDots">
  <div
    slot="no-more"
    style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
  >
    목록의 끝입니다 :)
  </div>
</infinite-loading>
```

</div>
</details>

- 이때, vue-infinite-loading는 $state.loaded와 $state.complete로 무한스크롤이 끝났는지 끝나지 않았는지 판단합니다.
- 판단할 수 있도록 구분값이 필요했는데 해당 api는 Action 함수를 통해 가져오므로, state에 올려서 판단하도록 했습니다.

<details>
<summary><b>Vue script 코드</b></summary>
<div markdown="1">

```javascript
data() {
	return {
		...
		lastCreatedAt: 'firstCall',   // 초기 값.
	}
}
...
async infiniteHandler($state) {
  this.READ_PERSONAL_BOARD_LIST({   // 퍼스널 보드를 조회하는 action함수
    lastCreatedAt: this.lastCreatedAt,
  });
  await setTimeout(() => {
		// isInfinity는 state에 올라가 있다. 초기 값은 Y
    if (this.isInfinity === 'Y') {
			// 마지막 DOM의 dataset에서 createdAt을 가져와, data에 등록된 lastCreateAt에 집어넣는다.
      this.lastCreatedAt = this.$refs.boardItem.lastChild.dataset.lastCreatedAt;
      $state.loaded();  // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
    } else {
      $state.complete();  // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
    }
  }, 1000);
},
```

</div>
</details>

📌 [따로 정리해 둔 링크](https://github.com/pozafly/TIL/blob/main/Vue/Vue 무한스크롤.md)

<br/>

### 5.2 event 중첩 문제

- 프로젝트 내 title 수정 로직은 클릭시 input 태그가 그 자리에 띄워져 수정 후 Enter를 누르거나, input에서 포커스를 벗어나면 UPDATE 되는 방식을 선택했습니다.
- input 태그에 @keyup.enter와 @blur를 사용하는데 keyup 이벤트가 발생하면 blur 이벤트까지 같이 일어나 api가 2번 요청되는 이슈가 있었습니다.

<details>
<summary><b>기존코드</b></summary>
<div markdown="1">

```html
<input
  class="form-control"
  v-if="isEditTitle"
  type="text"
  v-model="inputTitle"
  ref="inputTitle"
  @keyup.enter="onSubmitTitle"
  @blur="onSubmitTitle"
/>
```

</div>
</details>

- 이때, 2개 모두 onSubmitTitle을 거는 것이 아니라 @keyup.enter 이벤트에는 blur 이벤트가 트리거 되는 이벤트를 따로 등록시켜주어 개선할 수 있었습니다.

<details>
<summary><b>개선 된 코드</b></summary>
<div markdown="1">

```html
<input
	...
  @keypress.enter="onKeyupEnter"
  @blur="onSubmitTitle"
/>
...
onKeyupEnter(event) {
  event.target.blur();
},
```

</div>
</details>

<br/>

### 5.3 페이지 새로고침 시 state 데이터가 조회되지 않는 문제

- Vue는 SPA 이므로 새로고침 했을 때, state에 jwt(token), user 정보등의 데이터가 지워져 여러 오류를 발생시켰습니다.
- 이를 해결하기 위해서 브라우저 저장소(쿠키)를 이용하기로 했습니다.
- 하지만, 쿠키는 4kb밖에 되지 않고 서버에 계속해서 쿠키를 보내기 때문에 제외 하기로 했습니다.
- 로컬 스토리지에는 user와 token 정보를 두었는데 이는 페이지를 나갔다가 재접속 했을 시, 바로 main화면으로 로그인 된 상태로 클라이언트가 이용하게 하기 위함입니다.
- 세션 스토리지는 board 정보나 그 외 다시 api를 연동해야하는 휘발성이 있는 객체들을 저장하기로 했습니다.

📌 [Git Commit](https://github.com/pozafly/tripllo_vue/commit/5c239dc691985746a44d2d6bd128216ea4374c85)

- 새로고침 시 state에서 webStorage에 저장된 Data를 가져오도록 했습니다.

<details>
<summary><b>state 코드</b></summary>
<div markdown="1">

```jsx
state.js

const state = {
  token: getUserFromLocalStorage('user_token') || '',
  user: {
    id: getUserFromLocalStorage('user_id') || '',
    email: getUserFromLocalStorage('user_email') || '',
    name: getUserFromLocalStorage('user_name') || '',
    bio: getUserFromLocalStorage('user_bio') || '',
    social: getUserFromLocalStorage('user_social' || ''),
    picture: getUserFromLocalStorage('user_picture') || '',
    recentBoard: getUserFromLocalStorage('user_recentBoard') || '',
    invitedBoard: getUserFromLocalStorage('user_invitedBoard') || '',
    createdAt: getUserFromLocalStorage('user_created_at') || '',
  },
  isInfinity: 'Y',
  personalBoard: [],
  recentBoard: [],
  invitedBoard: [],
  board: getSessionStorage('board') || {},
  card: getSessionStorage('card') || {},
  checklists: getSessionStorage('checklists') || [],
  bgColor: getSessionStorage('bgColor') || '',
  comment: [],
  socket: null,
  pushMessage: '',
  file: [],
  mainTabId: 0,
  hashtagBoards: [],
  hashtags: [],
};
```

</div>
</details>

<br/>

### 5.4 API 요청 시 JWT 인증 문제

API 요청 시 JWT 인증 문제

- 다음과 같이 axios interceptor에서, 로그인 후 받아온 JWT token을 header에 담아 백엔드로 보내 인증을 하고 싶었습니다.

<details>
<summary><b>interceptor.js</b></summary>
<div markdown="1">

```javascript
instance.interceptors.request.use(
  function(config) {
    config.headers.Authorization = store.state.token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
```

</div>
</details>

- SpringSecurity의 JwtTokenProvider class에서 `request.getHeader("TOKEN");` 이렇게 token을 받고 있었는데, 이는 token 앞에 "TOKEN" 이라는 문자열을 붙인 뒤 token을 보내야만 읽어들일 수 있는 코드였습니다.

<details>
<summary><b>기존코드</b></summary>
<div markdown="1">

```java
// Request의 Header에서 token 값을 가져옵니다. "TOKEN" : "TOKEN값'
public String resolveToken(HttpServletRequest request) {
    return request.getHeader("TOKEN");
}
```

</div>
</details>

- 사진과 같이 크롬 Network tap의 Request Header에 `Authorization` 이라는 key를 가지고 보내고 있었기 때문에 JwtTokenProvider에서 이를 불러오지 못하고 있었습니다.

<img width="711" alt="스크린샷 2021-02-17 오후 2 45 26" src="https://user-images.githubusercontent.com/59427983/108161686-e20eff00-712e-11eb-85b9-8cde73d9b596.png">

- 따라서 JwtTokenProvider class에서 **Authorization** 이라는 이름으로 token을 받겠다고 명시해 주어 문제를 해결했습니다.

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

```java
public String resolveToken(HttpServletRequest request) {
    return request.getHeader("Authorization");
}
```

</div>
</details>

<br/>

## 6. 그 외 트러블 슈팅





### SpringSecurity & Swagger 문제

- SpringSecurity를 적용하기 전 Swagger로 api를 문서화 하고 있었습니다.
- Security를 도입하면서 Swagger에도 Security config가 걸리면서 `Whitelabel Error Page`라는 오류를 만났습니다.
- WebSecurityConfig class 에 다음과 같이 swagger에 접속할 수 있는 구문을 추가 해주었습니다.



<br/>