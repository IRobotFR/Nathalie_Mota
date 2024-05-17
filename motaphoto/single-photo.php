<?php
// single-photo.php

get_header(); // en-tête du thème
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        while (have_posts()) :
            the_post();

            // contenu de l'article
            get_template_part('templates_parts/photo-bloc');

        endwhile;
        ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer(); // pied de page du thème
