<div id="myModal" class="modal">
    <div class="modal-content">
        <img class="img-contact" src="<?php echo get_template_directory_uri(); ?>'/assets/images/contact.png'" alt="contact">

        <span class="close">&times;</span>
        
        <?php
        
        $refPhoto = get_field('reference');
         echo do_shortcode('[contact-form-7 id="37627d1" title="Formulaire de contact"]');
        ?>
        
    </div>
</div>