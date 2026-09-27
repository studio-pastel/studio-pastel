<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns#" itemscope itemtype="http://schema.org/WebPage">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MQHM11CJV2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MQHM11CJV2');
</script>
<script type="text/javascript" src="//webfonts.xserver.jp/js/xserver.js"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php wp_title( '｜', true, 'right' );bloginfo('name'); ?></title>
<link rel="icon" href="<?php bloginfo('template_url'); ?>/favicon.ico">
<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>?ver=<?php echo date('U'); ?>">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

		<header>
			<h1><a href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_url'); ?>/assets/images/common/logo.svg" alt="Design Studio PASTEL Inc."></a></h1>
			<nav>
				<ul>
					<li><a href="<?php bloginfo('url'); ?>/about/">about</a></li>
					<li><a href="<?php echo get_post_type_archive_link( 'works' ); ?>">works</a></li>
					<li><a href="<?php bloginfo('url'); ?>/contact/">contact</a></li>
				</ul>
			</nav>
	</header>