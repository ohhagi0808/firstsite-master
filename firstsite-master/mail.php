<?php
$action = $_POST['action'];
$name = htmlspecialchars($_POST['user_name']);
$email = htmlspecialchars($_POST['user_mail']);
$comment = htmlspecialchars($_POST['user_message']);
$to = 'qremokawasaki@gmail.com';
$subject = 'form-mail-sample-1';
$message = '[お名前]'."\n".$name."\n";
$message .= '[Eメール]'."\n".$email."\n";
$message .= '[メッセージ]'."\n".$comment."\n\n\n";
$header = 'From: '.$email."\r\n";
$header .= 'Reply-To: '.$email."\r\n";
if($_SERVER["REQUEST_METHOD"] == "POST"){
$status = mb_send_mail($to, $subject, $message);
if ($status) {
echo '<p class="msg">メッセージは正常に送信されました</p>';
echo '<button type="button" onclick="history.go(-1)">入力フォームに戻る</button>';
} else {
echo '<p class="msg">メッセージの送信に失敗しました</p>';
echo '<button type="button" onclick="history.go(-1)">入力フォームに戻る</button>';
}
}
