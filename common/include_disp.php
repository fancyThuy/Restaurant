<?php
/**
 * インクルード処理用関数
 */

 if (is_file(__DIR__."/config.php")) {
     require_once(__DIR__."/config.php");
 }

// SP階層？
$SP_FLG = (strpos(__DIR__, '/sp/') !== false) ? true : false ;

/**
 * [getSEO description].
 * @return [type] [description]
 */
function getSEO()
{
    global $SP_FLG;
    // yamlの読込
    require_once 'Spyc.php'; // yamlライブラリ
    $data = spyc_load_file(($SP_FLG) ? __DIR__.'/../../common/seo.yaml' : __DIR__.'/seo.yaml' );

    if(!is_array($data)) {
        exit('yaml file error');
    }

    foreach ($data['seo'] as $v) {
        if (strpos($_SERVER['REQUEST_URI'], $v['page']) !== false) {
            return $v;
        }
    }

    // 一致するのがなかったら
    return $data['default'];
}

// PCのcommonにyamlファイルがあるかのチェック
if ( (!$SP_FLG and is_file(__DIR__.'/seo.yaml') ) or ($SP_FLG and is_file(__DIR__.'/../../common/seo.yaml') ) ) {
    $SEO = getSEO();

    define('SEO_TITLE', $SEO['title']);
    define('SEO_DESCRIPTION', $SEO['description']);
    define('SEO_KEYWORDS', $SEO['keywords']);
    define('SEO_H1', $SEO['h1']);
}


/*
sample code
<title><?=SEO_TITLE?></title>
<meta name="description" content="<?=SEO_DESCRIPTION?>">
<meta name="Keywords" content="<?=SEO_KEYWORDS?>">
*/

// 相対パスを取得

//このサイトのＴＯＰ階層を抽出する（裏側のファイルのパスなどに使用）
$base_path = str_replace("/common", "", dirname(__FILE__));

//ドキュメントルート ディレクトリのパスを除去する
$inc_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $base_path) . '/';

// ディレクトリ名
$plc = basename(dirname($_SERVER['PHP_SELF']));

/**
 * function で内容を出力案件によって、左・右メニュー、フッターに動的カテゴリーなど
 * データベースへの接続が必要な場合がある。
 * 変数名を多く使うと、同じ変数名を使用されてしまい誤動作を起こす可能性があるためfunctionを使用
 * （変数が初期化されていないと表示内容のデータが出てしまう、別なところで配列で使っているなどがある場合）
 * 置換をすれば楽にパスが変更できる
 * href="../ → href="{$inc_path}
 * src="../ → src="{$inc_path}
 */


/**
 * ヘッダー用
 */
function DispHeader(){
    global $inc_path; //USE {$inc_path}

    /**
     * variable functions
     * <h1>{$cname('SEO_H1')}</h1>
     */
    $cname = 'constant';

    $html = <<<EDIT
    <!--Header-->
    <header class="header">
    <div class="header_top">
      <div class="container flexbox">
        <div class="header_top_logo"><a href="{$inc_path}"><img alt="新日本物流株式会社" src="{$inc_path}common_img/logo.png"></a></div>
        <div class="header_top_icon hastext_false">
          <div class="txttel">
            <div class="txt_inside"><img src="{$inc_path}common_img/txttel.png" alt="tel:03-5338-3751"><span>【受付時間】8:00～17:00（定休日：土日祝）</span></div>
          </div>
          <div class="txtmail"><a class="txt_inside" href="{$inc_path}contact/"><span>お問い合わせ<small>(24時間受付)</small></span></a></div>
          <div class="icon icon-hamburger js-hamburger type1">
            <div class="icon-bar"><span></span><span></span><span></span></div>
          </div>
          <div class="header_nav type1">
            <nav class="container header_nav_inside">
              <ul class="nav-list">
                <li class="nav-list-item"><a href="{$inc_path}about/">新日本物流について<span>ABOUT US</span></a></li>
                <li class="nav-list-item"><a href="{$inc_path}service/">業務内容<span>SERVICE</span></a></li>
                <li class="nav-list-item"><a href="{$inc_path}recruitment/">採用情報<span>RECRUITMENT</span></a></li>
                <li class="nav-list-item"><a href="{$inc_path}company/">会社案内<span>COMPANY</span></a></li>
                <li class="nav-list-item"><a href="{$inc_path}news/">新着情報<span>NEWS</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- /Header Top -->
    <!-- /Global Nav -->
  </header>
    <!--EndHeader-->
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}

/**
 * サイド
 */
function DispSide()
{
    global $inc_path; //USE {$inc_path}

    $html = <<<EDIT

EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}

/**
 * フッター
 */
function DispFooter()
{
    global $inc_path; //USE {$inc_path}

    $html = <<<EDIT
    <!--Footer-->
    <section class="seccommon">
    <div class="container">
      <h3 class="text_center">ご相談・お見積りはお気軽にお問い合わせください！</h3>
      <div class="flexbox">
        <div class="info">
          <h4 class="text_center">電話での問い合わせ</h4>
          <div class="inbox"><img src="{$inc_path}common_img/txttelred.png" alt="tel:03-5338-3751"><small>【受付時間】8:00～17:00（定休日：土日祝）</small></div>
        </div>
        <div class="info">
          <h4 class="text_center">WEBでの問い合わせ</h4>
          <div class="inbox"><a class="btncon" href="{$inc_path}contact/"><span>お問い合わせはこちら</span></a></div>
        </div>
      </div>
    </div>
  </section>
  <footer class="footer">
    <div class="footer-info container">
      <div class="info"><a class="logo" href="{$inc_path}"><img alt="新日本物流株式会社" src="{$inc_path}common_img/logo.png"></a>
        <p>〒160-0023 東京都新宿区西新宿8-2-20<br>井上ビル10号館 301号室<br>TEL：03-5338-3751<br>FAX：03-5338-3753</p>
        <p class="map"><a href="">>アクセスマップ</a></p>
      </div>
      <div class="navft flexbox">
        <ul>
          <li> <a href="{$inc_path}">- TOP</a></li>
          <li> <a href="{$inc_path}about/">- 新日本物流について</a></li>
          <li> <a href="{$inc_path}company/">- 会社案内</a></li>
        </ul>
        <ul>
          <li> <a href="{$inc_path}recruitment/">- 採用情報 </a></li>
          <li> <a href="{$inc_path}contact/">- お問い合わせ</a></li>
          <li> <a href="{$inc_path}contact/#pp">- 個人情報保護方針</a></li>
        </ul>
        <ul>
          <li> <a href="{$inc_path}service/">- 業務内容</a></li>
          <li><a href="{$inc_path}">> 業務名①</a></li>
          <li> <a href="{$inc_path}">> 業務名②</a></li>
          <li> <a href="{$inc_path}">> 業務名③</a></li>
          <li> <a href="{$inc_path}">> 業務名④</a></li>
          <li> <a href="{$inc_path}">> 業務名⑤</a></li>
        </ul>
      </div>
    </div>
    <div class="backtop">
      <div class="backtop-icon"><a class="lh00" href="javascript:void(0)"><img src="{$inc_path}common_img/backtop.png" alt="PAGE UP"></a></div>
    </div>
    <div class="footer-bottom">
      <p>（C）2020 新日本物流株式会社</p>
    </div>
  </footer>
    <!--EndFooter-->
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;

}

/**
 * 全ページに追加
 * headタグの開始の直後
 *
 * <head>
 * DispAfterHeadStartTag()
 *
 */
function DispAfterHeadStartTag()
{
    global $inc_path;

    $html = <<<EDIT
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}

/**
 * 全ページに追加
 * headタグの閉じの直上
 *
 * DispBeforeHeadEndTag()
 * </head>
 *
 */
function DispBeforeHeadEndTag()
{
    global $inc_path;

    $html = <<<EDIT
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}

/**
 * 全ページに追加
 * bodyタグの開始の直後
 *
 * <body>
 * DispAfterBodyStartTag()
 *
 */
function DispAfterBodyStartTag()
{
    global $inc_path;

    $html = <<<EDIT
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}

/**
 * 全ページに追加
 * bodyタグの終了の直上
 *
 * DispAfterBodyStartTag()
 * </body>
 *
 */
function DispBeforeBodyEndTag()
{
    global $inc_path;

    $html = <<<EDIT
EDIT;

    //内容を返す。（ここで表示だとショッピングのテンプレートでは表示が難しい為、データを返す）
    return $html;
}