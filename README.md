# :pushpin: Tripllo

> Trello Clone, 계획 공유 서비스
>
> 메인 : <a>https://tripllo.tech</a>
>
> 간단 메뉴얼 : <a>https://tripllo.tech/manual</a>

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

1. 전체 흐름
2. 계획 등록
3. 사용자 초대
4. 소셜 기능

<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">


### 4.1 전체 흐름

![전체 프로세스](https://user-images.githubusercontent.com/59427983/108020126-06030f80-705f-11eb-934d-d115b3e90e20.jpg)

<br/>

### 4.2 계획 등록

- **카드 기능**

  - Location(구글맵 API) 

    - 구글맵 API를 사용해서 card에서는 static 이미지를 불러오며 클릭 시, 구글맵 전체를 볼 수 있습니다.
    - 구글맵 상세 페이지에서는 해당 Board에서 등록된 모든 location이 지도에 표시되는 클러스터 기능이 구현되어 있습니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailLocation/LocationMap.vue#L56)

  - Attachment

    - 파일 업로드 시 local에 파일을 저장 후 S3에 올린 다음 local에 남은 파일을 지웁니다.
    - Spring Cloud AWS를 이용해 S3에 static_[유저이름] 으로 된 폴더를 생성해 파일을 저장합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/5a0c0d1fd697f5c6ec74d39b4e9f058ac6ab914c/src/main/java/com/pozafly/tripllo/fileUpload/S3Uploader.java#L29)
    - 파일은 권한 체크 후 다운받거나 삭제할 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailAttachment/AttachmentList.vue#L48)

  - Checklist

    - KProgress 모듈을 사용해 체크 목록이 변화할 때마다 게이지가 변합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailChecklists/Checklists.vue#L155)
    - 이름을 변경할 때 *event.relatedTaget*으로 이벤트 버블링을 방지합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/card/cardDetail/detailItems/detailChecklists/Checklists.vue#L119)

  - Comments

    - 답글(대댓글)을 위한 group_num, dept 칼럼을 두어 답글을 표현합니다.
    - 삭제 시 댓글에 답글이 없을 경우는 화면에서 사라지지만, 답글이 존재하는 경우 *삭제된 메세지 입니다.* 라고 표시됩니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/5a0c0d1fd697f5c6ec74d39b4e9f058ac6ab914c/src/main/java/com/pozafly/tripllo/comment/service/impl/CommentServiceImpl.java#L91)

  - 그 외 기능 - Description(메모), Labels(라벨링), dueDate(날짜 지정)
- **드래그 앤 드롭** 

  - dragula 모듈을 사용해, List와 Card를 드래그해서 위치를 변화시킬 수 있습니다.
  - 대상의 이전 DOM과 다음 DOM을 비교해서 pos(포지션) 값을 지정 후 UPDATE 합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/utils/dragger/dragger.js#L8)
- **화면 렌더링**
  - Action 함수 호출 후 Component를 다시 그려줄 수 있는 Action 함수를 호출합니다. :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_vue/blob/d83f89c1f799b4281fcf43d8a40242991fb7afb2/src/store/actions.js#L158)
  - 1:N 관계를 가진 컴포넌트가 쿼리문으로 조회된 후 리랜더링 됩니다.  :pushpin:  [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/77266edb3c874cd43132425e75a587641e4983fd/src/main/resources/mapper/BoardMapper.xml#L195)

<br/>

### 4.3 사용자 초대

- **유저 검색**
  - 모달 창에서 초대하고 싶은 회원의 ID를 검색합니다. filter를 사용해 자신과 이미 초대된 사람은 목록에 뜨지 않습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/board/Invite.vue#L64)

- **실시간 messaging**
  - 로그인 후 sockjs-client로 공통 컴포넌트인 Header.vue에서 Connection을 실행합니다.  :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/666fd04cd62171bd760f8788c59eb467e1c26b20/src/utils/socket.js#L5)
  - Spring WebSocket에서 HandshakeInterceptor 를 통해 socket 세션을 받아온 후, 현재 접속자 끼리 초대장을 보낼 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/webSocket/WebSocketHandler.java#L19)
  - Header.vue에서 초대장을 받고, Notification 처리와, 초대장 개수를 표현합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/common/Header.vue#L161)
- **초대 수락**
  - 유저가 초대된 Board의 invitedUser 목록에 추가되고, 해당 유저의 invitedBoard 목록에 추가됩니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/8148cee37d7700444dafc9c8d2c303942172957a/src/components/common/MessageDetail.vue#L30)
  - 이때, 초대한 사람의 Board가 수정되어야 하므로 Spring Interceptor에서 권한 체크를 합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/common/interceptor/BoardAuthInterceptor.java#L77)

<br/>

### 4.4 소셜 기능

- 해시태그
  - Array - push, splice를 통해 해시태그를 지정, 삭제할 수 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/fa0b24d02ad944a63ae18f1734024faebdfab76b/src/components/board/HashtagDisplay.vue#L72)
  - Board를 만든 주인만 해시태그를 수정할 수 있도록 화면 숨김 처리되어 있습니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/fa0b24d02ad944a63ae18f1734024faebdfab76b/src/views/BoardPage.vue#L62)
  - N:M 관계를 board_has_hashtag 중간 테이블을 두고 1:N 관계로 풀어서 조회합니다.  :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/HashtagMapper.xml#L12)
  
- 좋아요
  - 좋아요 순서로 Public Tab의 상단에 표현됩니다.
  - Board 조회 시, 유저의 좋아요 클릭 여부를 판단하기 위해 own_like 칼럼을 표현합니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/BoardMapper.xml#L23)

</div>
</details>

<br/>

## 5. 핵심 트러블 슈팅

### 5.1 무한 스크롤 적용 문제

- Board 조회 시, Data를 **한 번**에 조회하는 방식이었습니다.
- 무한 스크롤을 적용할 때 전체를 조회하는 것이 아니라 이어지는 일부분을 가져와야 했습니다.
- [커서 기반 페이지네이션](https://velog.io/@minsangk/%EC%BB%A4%EC%84%9C-%EA%B8%B0%EB%B0%98-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-Cursor-based-Pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)을 읽고 MySQL의 limit와 offset을 사용해서 들고 오면, **Table 전체를 조회** 후 offset에 맞는 Data를 가져오게 되므로 성능상 문제가 생긴다는 사실을 알게 되었습니다. 

<details>
<summary><b>기존SQL</b></summary>
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

- 커서(기준)는 정렬하고 있는 대상인 created_at 이며
- 처음 조회 시 lastCreatedAt 변수에 `firstCall` 문자열을 주어, 14개의 데이터만 조회했습니다.
- 이후 조회 시 lastCreatedAt 변수에 `화면에 뿌려진 마지막 DOM의 createdAt`로 조회하면, 커서(기준)보다 작은 순서로 Data를 가져옵니다. 

<details>
<summary><b>수정된 SQL</b></summary>
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

- Vue에서는 `vue-infinite-loading` 패키지를 설치하고, lastCreatedAt 변수에 담길 값을 HTML dataset 에 두어 정보를 가져오게 했습니다.

<details>
<summary><b>Vue templete 코드</b></summary>
<div markdown="1">

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

- 이때, vue-infinite-loading는 `$state.loaded`와 `$state.complete`로 무한스크롤이 끝났는지 판단합니다.
- 판단을 위해 구분값이 필요했는데, state에 isInfinity 변수를 생성하여 판단하도록 했습니다.

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
infiniteHandler($state) {
  this.READ_PERSONAL_BOARD_LIST({   // 퍼스널 보드를 조회하는 action함수
    lastCreatedAt: this.lastCreatedAt,
  });
  setTimeout(() => {
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

<br/>

### 5.2 vue watch 사용 시 객체 감지 & lodash debounce 문제

- 회원가입 페이지에서 input을 조작할 때, 동적으로 validation 체크와 button 활성화 기능을 넣고 싶었습니다.
- vue의 watch를 통한 데이터를 감지와 input 태그에 debounce를 걸어 약간의 딜레이를 주고자 했습니다.
- 하지만, vue data에 선언된 userData가 객체형태였고 객체의 요소 하나라도 변하면 메서드가 실행되는 문제가 발생했습니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

```javascript
data() {
  return {
    userData: {
      id: '',
      password: '',
      email: '',
      name: '',
      response: '',
      name: '',       
    },
  },
}
...
watch: {
  userData: {
    id: function() {
      () => {
        _.debounce(function(e)) {
          this.validUserId(e);
        }
      },
    ...
    },
  },
},
```

</div>
</details>

- 아래와 같이
- 객체 내부의 변수 1개만 감지 :  `'객체.변수명': [some function]`
- 객체 내부 요소가 하나라도 변화할 때 감지 : `handler(e)`, `deep: true`
- debounce는 즉시 실행 함수로 선언하는 것이 아니라, 함수 자체를 등록해줘야 한다는 것을 알게 되어 개선할 수 있었습니다.

<details>
<summary><b>개선된 코드</b></summary>
<div markdown="1">

```javascript
watch: {
  userData: {
    handler(e) {
      ...
      e.id !== '' && e.password !== '' && e.email !== '' && e.name !== ''
        ? (this.btnDisabled = false)
      : (this.btnDisabled = true);
    },
    deep: true,
  },
  'userData.id': _.debounce(function(e) {
    this.validUserId(e);
  }, 750),
  'userData.password': _.debounce(function(e) {
    this.validatePw(e);
  }, 750),
  againPassword: _.debounce(function(e) {
    this.validateAgainPw(e);
  }, 750),
  'userData.email': _.debounce(function(e) {
    this.validateEmail(e);
  }, 750),
},
```

</div>
</details>

<br/>

### 5.3 새로고침 시 state가 사라지는 문제

- Vue는 SPA이므로 새로고침 했을 때, state에 jwt(token), user 정보 등의 데이터가 지워져 여러 오류를 발생시켰습니다.
- 이를 해결하기 위해서 브라우저 저장소(쿠키)를 이용 하여 문제를 해결했습니다.
- 하지만, 쿠키는 4kb밖에 되지 않고 서버에 계속해서 쿠키를 보내기 때문에 제외하고 webStorage를 사용하기로 했습니다.
- `localStorage`는 user와 token 정보를 저장합니다. 재접속 시, 로그인된 상태로 이용하게 하기 위함입니다. :pushpin: [코드 확인](https://github.com/pozafly/tripllo_vue/blob/666fd04cd62171bd760f8788c59eb467e1c26b20/src/routes/index.js#L8)
- `sessionStorage`는 새롭게 api를 연동해야 하는 휘발성이 있는 객체들을 저장합니다. :pushpin: [commit 보기](https://github.com/pozafly/tripllo_vue/commit/5c239dc691985746a44d2d6bd128216ea4374c85)
- 새로고침 시, state에서 webStorage에 저장된 Data를 가져오도록 했습니다.

<details>
<summary><b>state 코드</b></summary>
<div markdown="1">

```javascript
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

<details>
<summary><b>webStorage 코드</b></summary>
<div markdown="1">

```javascript
function saveUserToLocalStorage(user) {
  localStorage.setItem('user_id', user.id);
  localStorage.setItem('user_email', user.email);
  localStorage.setItem('user_name', user.name);
  localStorage.setItem('user_social', user.social);
  localStorage.setItem('user_bio', user.bio);
  localStorage.setItem('user_picture', user.picture);
  localStorage.setItem('user_recentBoard', user.recentBoard);
  localStorage.setItem('user_invitedBoard', user.invitedBoard);
  localStorage.setItem('user_created_at', user.createdAt);
}

function saveUserToken(token) {
  localStorage.setItem('user_token', token);
}

function getUserFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

function clearSessionStorage() {
  sessionStorage.clear();
}

function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function deleteSessionStorage(key) {
  sessionStorage.removeItem(key);
}

export {
  saveUserToLocalStorage,
  saveUserToken,
  getUserFromLocalStorage,
  clearStorage,
  saveSessionStorage,
  getSessionStorage,
  deleteSessionStorage,
  clearSessionStorage,
};
```

</div>
</details>

<br/>

### 5.4 API 요청 시 JWT 인증 문제

- axios interceptor에서, 로그인 후 받아온 JWT token을 header에 담아 백엔드로 보내 인증을 하고 싶었습니다.

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

- SpringSecurity의 `JwtTokenProvider` class에서 아래와 같이 token을 받고 있었습니다.
- 이는 token 앞에 "TOKEN" 이라는 문자열을 가진 header를 읽는 코드입니다.

<details>
<summary><b>기존 코드</b></summary>
<div markdown="1">

```java
// Request의 Header에서 token 값을 가져옵니다. "TOKEN" : "TOKEN값'
public String resolveToken(HttpServletRequest request) {
  return request.getHeader("TOKEN");
}
```

</div>
</details>

- 사진과 같이 크롬 Network 탭의 Request Header를 확인해보면,
- token을,  `Authorization` 이라는 이름으로 보내고 있었기 때문에 JwtTokenProvider에서 이를 불러오지 못하고 있었습니다.

<img width="711" alt="스크린샷 2021-02-17 오후 2 45 26" src="https://user-images.githubusercontent.com/59427983/108161686-e20eff00-712e-11eb-85b9-8cde73d9b596.png">

- 따라서 JwtTokenProvider class에서 request.getHeader(**"Authorization"**) 코드로 token을 받겠다고 명시해 주어 문제를 해결했습니다.

<br/>

## 6. 그 외 트러블 슈팅

### 6.1 Frontend

<details>
<summary><b>Dev 서버가 실행되지 않는 문제(PostCSS)</b></summary>
<div markdown="1">

```javascript
Uncaught Error: Module build failed (from ./node_modules/postcss-loader/src/index.js) :
Error: PostCSS received undefined instead of CSS string
...
```

- PostCSS는 자바스크립트로 CSS 변환을 해주는 도구이며, **CSS 작성 경험을 향상 시켜주는 도구**. 
- npm을 업데이트했는데 node-sass, sass-loader 두 가지는 npm 버전을 많이 가린다고 알고 있었음.
- [npm 설치가 안되는 에러](https://velog.io/@2ujin/npm-설치가-안되는-에러) 를 참고하여 node-module을 지우고 다시 설치로 해결.
</div>
</details>

<details>
<summary><b>JSON.parse 문제</b></summary>
<div markdown="1">

- JSON.parse는 문자열을 json 형태로 만들어주는데, 이때, null 값이 들어가게 되면 파싱 오류를 뱉음.
- 따라서 파싱 전 if문으로 null 체크를 해줌. :pushpin: [코드 보기](https://github.com/pozafly/tripllo_vue/blob/9e857c084e89d48b45402f60ece3c1857678c8f1/src/components/main/PersonalSection.vue#L79)

</div>
</details>

<details>
<summary><b>vue-google-login 플러그인 문제</b></summary>
<div markdown="1">

- 커뮤니티에 링크를 공유 후 다른 접속자들의 환경에서는 접속이 안 된다는 제보를 받음.
- test시 크롬은 동작하는데 사파리에서 구글 로그인을 사용하니 아무 동작을 하지 않음.
- 플러그인을 지우고, Google 공식 버전으로 직접 코딩 후 해결. :pushpin: [코드 보기](https://github.com/pozafly/tripllo_vue/blob/master/src/utils/social/Google.js)

</div>
</details>

<details>
<summary><b>모달 외부 클릭 시 닫히지 않는 문제</b></summary>
<div markdown="1">

- 모달 외부 wrapper에 click 이벤트를 걸어, 모달 DOM을 제외한 곳을 click시 닫히도록 함. 📌  [코드 보기](https://github.com/pozafly/tripllo_vue/blob/6c87de7448e6d1666b93c516493327b7f72cf2f9/src/views/BoardPage.vue#L235)
- v-click-outside 모듈 사용.

</div>
</details>

<details>
<summary><b>비동기 처리 문제</b></summary>
<div markdown="1">

- async await를 사용하여 가독성이 좋게 만들어보려 했지만, Promise가 return 되지 않는 메서드에도 await를 사용하는 바람에 처리되지 않음.
- `(Promise 객체).then(() => {})` 문법으로 체이닝 하여 해결. :pushpin: [코드 보기](https://github.com/pozafly/tripllo_vue/blob/9e857c084e89d48b45402f60ece3c1857678c8f1/src/store/actions.js#L91)

</div>
</details>

<details>
<summary><b>Vue 파일 내, Script 로드 문제</b></summary>
<div markdown="1">

- 외부 API( ex) 소셜로그인, 구글맵) 를 사용할 때 index.html에 script 태그를 선언하게 되면 모든 페이지에서 스크립트가 로드된다.
- 성능 낭비이기 때문에, 하나의 vue 컴포넌트에서만 script를 load 하고 싶었다. 해당 vue 파일에서 script load가 필요한 상황.
- `vue-plugin-load-script` 모듈을 다운받아 플러그인 화하여 사용했음. :pushpin: [코드 보기](https://github.com/pozafly/tripllo_vue/blob/9e857c084e89d48b45402f60ece3c1857678c8f1/src/components/card/cardDetail/side/Location.vue#L32)

</div>
</details>

<details>
<summary><b>event 중첩 문제</b></summary>
<div markdown="1">

- 프로젝트 내 input 수정 로직은 Enter를 누르거나, input에서 포커스를 벗어나면 UPDATE 되는 방식을 사용함. 
- input 태그에 @keyup.enter와 @blur를 사용하는데 keyup 이벤트가 발생하면 blur 이벤트까지 같이 일어나 api가 2번 요청되는 이슈가 있었음.

  <details>
  <summary><b>기존 코드</b></summary>
  <div markdown="1">

  ```html
  <input
    ...
    @keyup.enter="onSubmitTitle"
    @blur="onSubmitTitle"
  />
  ```
  </div>
  </details>

- 이때, 2개 모두 같은 method를 등록하는 것이 아니라 @keyup.enter 이벤트에는 blur 이벤트가 트리거 되는 이벤트를 따로 등록시켜주어 개선할 수 있었음.

  <details>
  <summary><b>개선된 코드</b></summary>
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

</div>
</details>

<details>
<summary><b>한글 문자열 입력 시 함수가 2번 실행되는 문제.</b></summary>
<div markdown="1">

- keyup은 키보드에서 손을 떼었을 때 실행되며, keypress는 키보드를 눌렀을 때 실행됨.
- @keyup.enter 대신 @keypress.enter 으로 해결. :pushpin: [코드 보기](https://github.com/pozafly/tripllo_vue/blob/9e857c084e89d48b45402f60ece3c1857678c8f1/src/components/card/cardDetail/CardModal.vue#L16)

</div>
</details>

<details>
<summary><b>MySQL 글자 수 제한으로 인해 input 입력값이 등록되지 않는 문제. </b></summary>
<div markdown="1">

- input 속성으로 **maxlength**를 걸어주었음. :pushpin: [commit 보기](https://github.com/pozafly/tripllo_vue/commit/66dc7b573a860f7408de8c41206432a2c1651001)

</div>
</details>

<details>
<summary><b>display sticky 시, 다른 컴포넌트를 붙였을 때 ui가 틀어지는 문제</b></summary>
<div markdown="1">

- 상위 태그의 height가 auto 일 경우, height 값에 따라서 sticky가 위치를 조정함.
- height를 100%로 주어 하위 컴포넌트들이 높이 값을 상속받게 하여 해결. :pushpin: [commit 보기](https://github.com/pozafly/tripllo_vue/commit/783eb1bb54e878723dcf50b59b62c02b7d8f2e17)

</div>
</details>

<details>
<summary><b>무한 스크롤 시 한번 멈춰버리면 같은 페이지 내 다른 컴포넌트에서 동작하지 않는 문제</b></summary>
<div markdown="1">

- 무한 스크롤이 $state.complete 코드를 만나면 다음 탭에서 동작하지 않음.
- infinite-loading 태그의 :identifier 속성을 선언해서, 탭이 바뀌면 **infiniteId**를 변화시켜주어 다른 컴포넌트에서도 재동작 하도록 수정. :pushpin: [commit 보기](https://github.com/pozafly/tripllo_vue/commit/554baeffb0adb7eb6b82c4c728e5014e218315ad)

</div>
</details>

<br/>

### 6.2 Backend

<details>
<summary><b>SpringSecurity와 Swagger 문제</b></summary>
<div markdown="1">

- Security 적용 후 Swagger가 동작하지 않아, `WebSecurityConfig` class에 ignore 처리로 해결. :pushpin:[코드 보기](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/common/security/WebSecurityConfig.java#L93)

</div>
</details>

<details>
<summary><b>Java 타입 문제</b></summary>
<div markdown="1">

- 소수점이 붙은 String 형("12.0")의 숫자가 long 형으로 바로 변환이 안 되어 Double 타입으로 변경 후 long 타입으로 변경.

  ```java
  long listId = (long)Double.parseDouble(String.valueOf(requestBody.get("listId")));
  ```

  1. requestBody.get("listId") : Object 형
  2. String.valueOf : String 형으로 변환
  3. Double.parseDouble : Double 형으로 파싱
  4. (long) : long 형으로 변환

</div>
</details>

<details>
<summary><b>@AuthenticationPrincipal 현재 접속한 userId 가져오기</b></summary>
<div markdown="1">

- token으로 해당 User의 ID를 자동으로 받을 수 없을까 고민했음.
- 보안상으로 클라이언트가 직접 userId를 매개변수로 하여 api를 호출하면 다른 user의 정보가 변경될 수 있으므로.
- JwtTokenProvider에 있는 getUserPk() 메서드를 static화 하여 Contorller에서 끌어다 사용하기로 했음. (Controller에서 @RequestHeader(value = "Authorization")을 통해 token을 얻고 getUserPK() 메서드로 userId를 가져오는 방식) :pushpin: [commit 보기](https://github.com/pozafly/tripllo_springBoot/commit/419b5266c3531eb5e02204262ca7d72d3cd6f1da#diff-6fd385944e33e2fa5d338023a92a71e2ba0161719f5ffc7fbcf106bf513554e0)
- 하지만, SpringSecurity에서 제공하는 @AuthenticationPrincipal을 통해 손쉽게 가져오는 방법을 사용. :pushpin:  [commit 보기](https://github.com/pozafly/tripllo_springBoot/commit/dc5fb1c1b28642abadbdd8f968e0f7967aac69bd#diff-a85245a5e6338e27e8e77061d7faf11669d2b964173a405c125ecf439ab0373a)

</div>
</details>

<details>
<summary><b>Java 배열 요소 삭제 문제</b></summary>
<div markdown="1">

- 배열의 요소를 삭제 해야 했음. for문을 사용하고 싶지 않고 forEach로 배열을 순회하여 작업하고 싶었음.
- 하지만 오류 문도 없이 배열의 요소가 삭제되지 않았는데, [컬렉션에서 원소 삭제하기](https://www.daleseo.com/how-to-remove-from-list-in-java/) 를 참고하여 `removeIf()` 메서드 사용으로 문제를 해결. :pushpin:[코드 보기](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/board/service/impl/BoardServiceImpl.java#L255)

</div>
</details>

<details>
<summary><b>Interceptor에서 request body 사용 문제</b></summary>
<div markdown="1">

- 프로젝트에서 권한 문제는 큰 문제였으므로, SpringSecurity의 role을 이용하여 권한을 줄 수 있을지 고민.
- 하지만 role은 각기 다른 도메인에 부여할 수 없는 것. 도메인별 Interceptor를 만들어야겠다고 생각.
- Interceptor에서 권한을 체크하기 위해 Controller로 들어오는 @ReqeustBody를 끌어와야 했다. 그러려면 HttpServletRequestWrapper 객체를 상속받아 재구현해야 했다. 참고자료 :  [Interceptor에서 권한 관리하기](https://lannstark.tistory.com/19), [RequestBody의 내용을 로그로 남기고 싶다.](https://singun.github.io/2017/02/04/logging-requestbody/)
- ReadableRequestWrapper class 생성으로 해결. :pushpin:  [코드 보기](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/java/com/pozafly/tripllo/common/filter/ReadableRequestWrapper.java#L14)

</div>
</details>

<details>
<summary><b>MyBatis selectKey 문제</b></summary>
<div markdown="1">

- 테이블의 PK는 주로 auto_increment로 설정되어 레코드가 추가될 때마다 자동으로 1씩 올라가는 구조.
- insert 후, 이 PK 값을 사용해야 될 때가 있는데 MyBatis의 selectKey 태그를 이용해 PK값을 가져와서 사용. :pushpin:[코드 보기](https://github.com/pozafly/tripllo_springBoot/blob/48742b42e895ccf6121ef285eb11a1b5ff468a0b/src/main/resources/mapper/CommentMapper.xml#L36)

</div>
</details>

<details>
<summary><b>Gson, JsonParser 라이브러리 호환 문제</b></summary>
<div markdown="1">

- Gradlew 명령어를 사용하여, Gradle 6.6.1 -> Gradle 4.10.2 로 변경하여 해결.

</div>
</details>

<details>
<summary><b>Test ID 비밀번호 변경 문제</b></summary>
<div markdown="1">

- Spring Scheduler를 사용하여 Test ID를 만들고, 7-23시 사이에 2시간 간격으로 Test ID의 모든 데이터가 재구성되도록 만들어 놓았음.
- 하지만 누군가 Test ID의 비밀번호를 바꾸는 바람에 접속할 수 없게 되었음.
- SpringSecurity에서 제공하는 passwordEncoder의 BCrypt 방식으로 비밀번호를 저장하고 login 시 복호화하여 login 하므로 쿼리문으로 비밀번호를 원상태로 돌리는 것은 불가능함.
- 미리 만들어둔 ApplicationRunner를 구현한 class가 있었기 때문에 다시 build 후 원상복구 시킨 뒤, 방어 로직을 추가함.

</div>
</details>

<br/>

### 6.3 배포

<details>
<summary><b>EC2 access key 노출로 ssh 접속 후, 지속적 끊김 문제</b></summary>
<div markdown="1">

- EC2 - amazon linux 2로 인스턴스를 만들고 SpringBoot와 연동하는 도중, Github에 secret key를 노출하는 사건이 발생.
- ssh 접속이 되어도 15분 안으로 끊어지는 이슈. secret key가 노출되었다고 aws로부터 여러 개의 이메일이 와있었음.
- Git reset HEAD 를 사용하여 commit을 삭제, aws에 알렸는데도 불구하고 ssh 접속이 끊기는 현상은 없어지지 않았음.
- `계정 삭제 후 다시 처음부터 세팅.` 이 사건으로 secret key는 반드시 ec2 내에 옮겨두고 SpringBoot로 부터 build시 ec2 내 따로 생성해둔 environment(properties) 파일을 함께 묶어 build가 되도록 함.

</div>
</details>

<details>
<summary><b>linux 메모리 문제</b></summary>
<div markdown="1">

- AWS free 유저이기 때문에 SpringBoot build 시 메모리 부족으로 build가 되지 않는 문제가 발생.
- swap 파일을 생성하여 설정해서 문제를 해결.
- 참고자료 : [리눅스 메모리 부족 문제 해결 방법](https://hiseon.me/linux/linux-swap-file/), [AWS(EC2) - swap 메모리 생성](http://www.macnorton.com/csLab/886323), [aws공식 swap 메모리 사용법](https://aws.amazon.com/ko/premiumsupport/knowledge-center/ec2-memory-swap-file/) 

</div>
</details>

<details>
<summary><b>Mixed Content 문제</b></summary>
<div markdown="1">

- Mixed Content는 https, http 간 통신 규약이 매칭되지 않을 때 생기는 문제.
- Frontend는 AWS-CloudFront와 AWS-Certificate Manager를 사용해 SSL이 적용되어 `https` url을 갖게 되었지만, Backend는 `http` url 이었으므로, Backend를 https url로 변경시켜주어야 했다.
- `let's encrypt` 로 무료 SSL 인증서를 발급받고 nginx의 Reverse Proxy를 사용하여 적용.
- 참고자료 : [nginx와 let's encrypt로 SSL 적용하기(+자동 갱신)](https://www.zerocho.com/category/NodeJS/post/5ef450a5701d8a001f84baeb), [nginx를 활용해 AWS EC2에 https 적용하기](https://velog.io/@teveloper/nginx-nginx%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%B4-AWS-EC2%EC%97%90-https-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-%EB%AC%B4%EB%A3%8C-SSL-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89)

</div>
</details>

<details>
<summary><b>Build 자동화 문제(Travis)</b></summary>
<div markdown="1">

- SpringBoot의 Build 자동화로 Travis를 사용하는데 build 에러가 남.
- AWS-RDS MySQL datasource가 SpringBoot단의 properties 파일에 있고, github 소스에 올릴 때는 해당 properties가 올라가지 않기 때문이다. (ec2에 따로 지정해둠)
- local에서는 properties가 존재하기 때문에 문제없이 build 되었지만 Github과 연동된 Travis는 Datasource가 없다며 빌드에러를 낸 것.
- `h2`를 적용하기로 했다. 메모리 DB인 h2는 Datasource가 존재하지 않아도 에러를 내지 않기 때문에.
- gradle에 따로 h2 라이브러리를 로드 받아 build 하여 문제를 해결함.

</div>
</details>

<details>
<summary><b>S3 File upload 시 local 파일 저장 권한 문제</b></summary>
<div markdown="1">

- SpringBoot에서 S3로 파일을 올릴 때 반드시 local 어딘가에 File을 저장 후 올리고 나서 지우는 작업을 하는 구조.
- mac 환경에서는 SpringBoot 폴더 내 파일이 생겼다가 지워지는데, 배포 후 linux에는 permission 문제가 생겼다.
- 따라서 SpringBoot의 properties에 환경별 path를 지정하고, @Value를 통해 디렉토리를 지정함.
- 그리고 linux 환경에서 해당 디렉토리를 만들어 chmod로 권한을 부여해 해결.

</div>
</details>



[프로젝트 문제점 및 후기](http://localhost:8000/tripllo/Tripllo%20%ED%9B%84%EA%B8%B0/)
