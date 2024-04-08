// 문제
// 하루에 한 시간 단위로 일을 하거나 일을 쉬어도 된다. 하루에 한 시간 일하면 피로도는
// $A$만큼 쌓이고 일은
// $B$만큼 처리할 수 있다.

// 만약에 한 시간을 쉰다면 피로도는
// $C$만큼 줄어든다. 단, 피로도가 음수로 내려가면
// $0$으로 바뀐다. 당연히 일을 하지 않고 쉬었기 때문에 처리한 일은 없다.

// 피로도를 최대한
// $M$을 넘지 않게 일을 하려고 한다.
// $M$을 넘기면 일하는데 번아웃이 와서 이미 했던 일들도 다 던져버리고 일을 그만두게 된다.

// 번아웃이 되지 않도록 일을 할때 하루에 최대 얼마나 일을 할 수 있는지 구해보자. 하루는 24시간이다.

// 입력
// 첫 번째 줄에 네 정수
// $A$,
// $B$,
// $C$,
// $M$이 공백으로 구분되어 주어진다.

// 맨 처음 피로도는 0이다.

// 출력
// 하루에 번 아웃이 되지 않도록 일을 할 때 최대 얼마나 많은 일을 할 수 있는지 출력한다.

let [A, B, C, M] = require("fs")
  .readFileSync(0)
  .toString()
  .split(" ")
  .map(Number);

function solution(A, B, C, M) {
  let maxWork = 0;
  let fatigue = 0;
  let hour = 0;

  // 피로도 맥스는 1시간 당 피로도 생산율은 넘어선 안 된다.
  while (hour < 24 && A <= M) {
    if (fatigue >= M) {
      // 피로도 맥스 초과 시
      hour++;
      fatigue -= C;
    } else if (fatigue >= 0) {
      // 피로도 여유 있을 떄
      hour++;
      fatigue += A;
      maxWork += B;
    }
    if (fatigue < 0) {
      fatigue = 0;
    }
  }
  console.log(maxWork);
}

solution(A, B, C, M);
