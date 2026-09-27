<?php get_header(); ?>

<article>

	<div class="wrapper">

		<dl>
			<dt>ED</dt>
			<dd>編集</dd>
			<dt>CD</dt>
			<dd>クリエイティブディレクション</dd>
			<dt>PL</dt>
			<dd>プランニング</dd>
			<dt>CM</dt>
			<dd>コンセプトメイキング</dd>
			<dt>CW</dt>
			<dd>コピーライティング</dd>
			<dt>WR</dt>
			<dd>ライティング</dd>
			<dt>GD</dt>
			<dd>グラフィックデザイン</dd>
			<dt>WD</dt>
			<dd>WEBディレクション</dd>
			<dt>OT</dt>
			<dd>その他</dd>
		</dl>

		<div class="works_wrap">
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<div>
				<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('thumbnail'); ?></a>
				<?php
				$cf_roles = get_field('role');
				if ($cf_roles): 
				?>
				<span class="ti"><?php the_title(); ?>　</span>
				<ul class="credit">
				<?php foreach ($cf_roles as $cf_role) : ?>
					<li><?php echo $cf_role; ?></li>
				<?php endforeach; ?>
				</ul>
				<?php endif; ?>
			</div>
			<?php endwhile; else: ?>
			<?php endif; ?>
			<?php if(function_exists('wp_pagenavi')) wp_pagenavi(array('query' => $wp_query)); ?>
			<?php wp_reset_query(); ?>
		</div>

	</div>

</article>

<?php get_footer(); ?>