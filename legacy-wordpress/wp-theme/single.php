<?php get_header(); ?>

<article>

	<div class="wrapper">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<h1 class="ti"><?php the_title(); ?></h1>
		<?php
		$cf_roles = get_field('role');
		if ($cf_roles): 
		?>
		<ul>
		<?php foreach ($cf_roles as $cf_role) : ?>
			<li><?php echo $cf_role; ?></li>
		<?php endforeach; ?>
		</ul>
		<?php endif; ?>
		<div class="co"><?php the_content(); ?></div>
		<div class="credit"><?php the_field('credit'); ?></div>

		<?php endwhile; endif; wp_reset_postdata(); wp_reset_query(); ?>

	</div>

</article>

<?php get_footer(); ?>


<?php get_footer(); ?>