let currentPlayer = "X";
let numPlays = 0;
let gameFinish = false;
let currentPlays = {
  X: [],
  O: [],
};
const winningPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

$(document).ready(function () {
  // TikTak
  $(".cell").on("click", function () {
    if (!gameFinish) {
      if ($(this).is(":empty")) {
        numPlays++;
        $(this).text(currentPlayer);
        currentPlays[currentPlayer].push(parseInt($(this).attr("data-index")));

        if (isWinner()) {
          result("win");
        }
        if (!gameFinish && numPlays == 9) {
          result("draw");
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });

  $("#tikTakBtn").click(function () {
    if ($(".calculator").is(":visible")) {
      calcToggle();
    }
    tikTakToggle();
  });

  $("#playAgain").click(function () {
    playAgain();
  });

  function result(status) {
    if (status == "win") {
      gameFinish = true;
      $("#gameResult").html("Winner: " + currentPlayer);
    } else {
      gameFinish = true;
      $("#gameResult").html("Draw");
    }
  }

  function playAgain() {
    currentPlayer = "X";
    numPlays = 0;
    gameFinish = false;
    currentPlays = {
      X: [],
      O: [],
    };
    $(".cell , #gameResult").text("");
    $(".cell").css('color','black');
  }

  function isWinner() {
    if (numPlays < 5) {
      return;
    }

    for (let i = 0; i < winningPositions.length; i++) {
      let isWinner = true;
      dataIndex = [];
      for (let j = 0; j < winningPositions[i].length; j++) {
        dataIndex.push(winningPositions[i][j]);
        if (
          $.inArray(winningPositions[i][j], currentPlays[currentPlayer]) < 0
        ) {
          isWinner = false;
          break;
        }
      }
      if (isWinner) {
        highlight(dataIndex);
        return true;
      }
    }
  }
  function highlight(dataIndex) {
    for (let i = 0; i < dataIndex.length; i++) {
      index = dataIndex[i].toString();
      $(".cell").filter(`[data-index=${index}]`).css("color", "red");
    }
  }

  function tikTakToggle() {
    if ($(".tikTak").is(":visible")) {
      $("#tikTakBtn").html("Tic Tac Toe");
    } else {
      $("#tikTakBtn").html("Hide Tic Tac Toe");
    }
    playAgain();
    $(".tikTak").toggle(1000);
  }

  // Calculator
  $("#calculator-btn").click(function () {
    if ($(".tikTak").is(":visible")) {
      tikTakToggle();
    }
    calcToggle();
  });

  $("#cBtn").click(function () {
    c();
  });

  $("#delBtn").click(function () {
    del();
  });

  $(".key").click(function () {
    if ($(this).val() === "X") {
      insert("*");
    } else {
      insert($(this).val());
    }
  });

  $("#eqlBtn").click(function () {
    equal();
  });

  function insert(num) {
    $(".calculator-display").val($(".calculator-display").val() + num);
  }

  function equal() {
    $(".calculator-display").val(eval($(".calculator-display").val()));
  }

  function c() {
    $(".calculator-display").val("");
  }

  function del() {
    value = $(".calculator-display").val();
    $(".calculator-display").val(value.substring(0, value.length - 1));
  }

  function calcToggle() {
    if ($(".calculator").is(":visible")) {
      $("#calculator-btn").html("Calculator");
    } else {
      $("#calculator-btn").html("Hide Calculator");
    }
    $(".calculator").toggle(1000);
    c();
  }
});
