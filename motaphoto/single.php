<?php
// single.php

get_header(); // Inclut l'en-tête du thème
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        while (have_posts()) :
            the_post();

            // Afficher le titre de l'article
            the_title('<h1 class="entry-title">', '</h1>');

            // Afficher le contenu de l'article
            the_content();

            // Pagination pour les articles divisés en pages
            wp_link_pages(array(
                'before' => '<div class="page-links">' . esc_html__('Pages:', 'your-theme-slug'),
                'after'  => '</div>',
            ));


        endwhile;
        ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar(); // Inclut la barre latérale du thème
get_footer(); // Inclut le pied de page du thème
