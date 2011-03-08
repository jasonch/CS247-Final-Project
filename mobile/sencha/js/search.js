 E x t . r e g C o n t r o l l e r ( " s e a r c h e s " ,   { 
     m o d e l :   " S e a r c h " ,   
 
     f i r s t :   f u n c t i o n   ( )   { 
         v a r   s t o r e   =   E x t . g e t S t o r e ( ' f r i e n d s ' ) ; 
                 f i r s t   =   s t o r e . f i r s t ( ) ; 
         i f   ( f i r s t )   { 
             E x t . d i s p a t c h ( { 
                 c o n t r o l l e r :   " s e a r c h e s " , 
                 a c t i o n :   " s h o w " , 
                 i n s t a n c e :   f i r s t , 
                 h i s t o r y U r l :   " f r i e n d s e a r c h / "   +   f i r s t . g e t ( ' q u e r y ' ) 
             } ) ; 
         }   e l s e   { 
             t h i s . n o S e a r c h e s ( ) ; 
         } 
     } , 
 
         / * * 
           *   S h o w s   t h e   r e s u l t s   o f   a   g i v e n   S e a r c h .   H a n d l e s   b o t h   a   S e a r c h   m o d e l   i n s t a n c e   b e i n g   p a s s e d   o r   a   q u e r y   s t r i n g 
           *   @ p a r a m   { O b j e c t }   o p t i o n s   C o n f i g   o b j e c t   e x p e c t e d   t o   h a v e   e i t h e r   a n   i n s t a n c e   o r   a   q u e r y   p r o p e r t y 
           * / 
         s h o w :   f u n c t i o n ( o p t i o n s )   { 
                 v a r   s e a r c h   =   o p t i o n s . i n s t a n c e , 
                         l i s t       =   t h i s . l i s t ; 
                 
                 / / i f   w e   w e r e n ' t   g i v e n   a   S e a r c h   i n s t a n c e ,   c r e a t e   a   n e w   o n e   n o w 
                 i f   ( ! s e a r c h )   { 
                         s e a r c h   =   n e w   t h i s . m o d e l ( { 
                                 q u e r y :   o p t i o n s . q u e r y . r e p l a c e ( " % 2 0 " ,   "   " ) 
                         } ) ; 
                 } 
                 
                 t h i s . h i g h L i g h t S e a r c h ( s e a r c h . g e t ( ' q u e r y ' ) ) ; 
                 
                 / * 
                   *   T h i s   u s e s   t h e   h a s M a n y   a s s o c i a t i o n   s e t   u p   i n   a p p / m o d e l s / S e a r c h . j s   t o   l o a d   t h e   t w e e t s   f o r   t h e   g i v e n   S e a r c h 
                   * / 
                 v a r   s t o r e   =   s e a r c h . f r i e n d s ( ) ; 
                 
                 / * * 
                   *   T h e   f i r s t   t i m e   w e   r e n d e r   t h e   t w e e t s L i s t   c o m p o n e n t ,   w e   s t o r e   a   r e f e r e n c e   t o   i t   i n   t h i s . l i s t   s o   t h a t   w e   c a n 
                   *   r e u s e   t h e   i n s t a n c e   w e   a l r e a d y   h a v e .   I f   w e   h a v e n ' t   r e n d e r e d   y e t ,   w e   r e n d e r   t h e   l i s t ,   o t h e r w i s e   w e   j u s t   b i n d 
                   *   a   n e w   S t o r e . 
                   * / 
                 i f   ( ! l i s t )   { 
                         l i s t   =   t h i s . l i s t   =   t h i s . r e n d e r ( { 
                                 x t y p e :   ' t w e e t s L i s t ' , 
                                 s t o r e :   s t o r e 
                         } ) ; 
                 }   e l s e   { 
                         l i s t . s c r o l l e r . s c r o l l T o ( { x :   0 ,   y :   0 } ,   7 0 0 ) ; 
                         l i s t . b i n d S t o r e ( s t o r e ) ; 
                 } 
                 
                 E x t . g e t C m p ( ' v i e w p o r t ' ) . s e t A c t i v e I t e m ( l i s t ) ; 
                 
                 s t o r e . l o a d ( ) ; 
         } , 
     
 
 } ) ; 
