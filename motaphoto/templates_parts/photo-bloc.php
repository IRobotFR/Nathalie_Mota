<!-- section photo de la single-photo -->
<div class="page-photo">
    <section class="page-photo_section-bloc">
		<ul class="page-photo_section-bloc_info">
            <li> <h1> <?= the_title() ?> </h1> </li>
			<li>
				<p class="detail-info-photo">RÉFÉRENCE : <span id="reference"><?= get_field('reference'); ?></span></p>
			</li>
			<li>
				<p class="detail-info-photo">TYPE : <?= get_field('type'); ?></p>
			</li>
			<li>
				<p class="detail-info-photo">CATÉGORIE : <?php the_terms($post->ID, 'categorie-photo') ?></p>
			</li>
			<li>
				<p class="detail-info-photo">FORMAT : <?= get_field('format'); ?> </p>
			</li>
			<li>
				<p class="detail-info-photo">TYPE : <?= get_field('type'); ?></p>
			</li>
			<li>
				<p class="detail-info-photo">ANNÉE : <?= get_field('annee'); ?></p>
			</li>
        </ul>
		<div class="photo-container">
            <div class="photo">
                <?php if (has_post_thumbnail()) : ?>
                    <img data-src="<?php the_post_thumbnail_url(); ?>" src="<?php the_post_thumbnail_url('medium_large'); ?>" alt="<?php the_title_attribute(); ?>"/>
                <?php endif; ?>
            </div>
            <!-- Div pour le hover -->
            <div class="hover-photo">
                <a href="#"><img id="icone-plein-ecran" class="icone-plein-ecran" src="<?php echo get_template_directory_uri(); ?>/assets/images/Icon_fullscreen.png" alt="Icone plein écran"></a>
            </div>
		</div>
    </section>
    
    <!-- Template bloc contact + prevnext -->
<?php get_template_part('templates_parts/photo-prevnext'); ?>


</div>


<!-- section recommandations -->
<div class="page-recommandations">

	<h3>VOUS AIMEREZ AUSSI</h3>
	<div class="page-recommandations_photo">
    
        <?php   

            $categorie = strip_tags(get_the_term_list($post->ID, 'categorie-photo'));

            // 1. On définit les arguments pour définir ce que l'on souhaite récupérer 
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie-photo',
                        'field' => 'slug',
                        'terms' => $categorie,
                    ),
                ),
            );

            // 2. On exécute la WP Query
            $my_query = new WP_Query( $args );

            // 3. On lance la boucle !
            if( $my_query->have_posts() ) : while( $my_query->have_posts() ) : $my_query->the_post();?> 

                <?php get_template_part('templates_parts/galerie'); ?>
        
            <?php
            endwhile;
            endif;

            // 4. On réinitialise à la requête principale (important)
            wp_reset_postdata();

        ?>

	</div>

</div>




<div class="recommandations-btn-container">
	<a href="<?php echo home_url('/'); ?>">
		<button class="interaction-photo__contact__btn">Toutes les photos</button>
	</a>
</div>


