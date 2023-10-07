const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する。
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // lin生成
  const li = document.createElement("li");
  li.innerText = text;

  // 完了button生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押下時に親要素divを未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);
    // 削除したtodoを完了リストに追加
    document
      .getElementById("complete-list")
      .appendChild(completeButton.parentNode);
    // 完了リストに移動するtodo
    const addTarget = completeButton.parentNode;
    // todo内容のテキストを取得
    const text = addTarget.firstElementChild.innerText;
    // div以下を初期化
    addTarget.textContent = null;
    // liタグを生成
    const li = document.createElement("li");
    li.innerText = text;
    // buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // todoを完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // todoのタイトルを取得
      const todoTitle = deleteTarget.firstElementChild.innerText;

      // todoを未完了リストに生成
      createIncompleteList(todoTitle);
    });

    // divタグの子要素に各要素を設定
    div.appendChild(li);
    div.appendChild(backButton);

    // 完了リスト追加
    document.getElementById("complete-list").appendChild(addTarget);
  });
  // 削除button生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押下時に親要素divを未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  // 未完了リストから指定todoを削除
  const deleteFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
  };

  // divタグの子要素に各要素を追加
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
