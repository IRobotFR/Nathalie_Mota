<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta <?php bloginfo('charset'); ?>>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
	<header class="header">
		<div class="container-header">

			<a href="<?php echo home_url( '/' ); ?>">
				<img class="logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/Logo.png" alt="Logo Motaphoto">
			</a>

			<nav class="navbar-header">

					<?php wp_nav_menu( array( 
						'theme_location' => 'main',
						'container' => 'ul', // afin d'éviter d'avoir une div autour 
						'menu_class' => 'navbar', // classe personnalisée
						) ); ?>
					
					<!-- Bouton ouverture menu burger -->
					<button class="burger">
						<span class="bar"></span>  
					</button>  

			</nav>


		</div>
	</header>	
