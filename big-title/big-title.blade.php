{{--
Title: Gros titre
Description: Plusieurs contenus sous forme d'accordéon horizontal
Category: template-blocks
Icon: heading
Post-Type: page
Keywords: title big
--}}

@php
  $data = Block::bigTitle($block['data']);
@endphp

<section class="b-big-title u-oh u-bgg u-z2">
  <div class="b-big-title__wrapper">
    <div class="b-big-title__suptitle e-suptitle">{!! $data['titles']['suptitle'] !!}</div>
    <h2 class="b-big-title__title">{!! $data['titles']['title'] !!}</h2>
    <div class="b-big-title__icon u-oh">{!! display_svg('battery') !!} <span></span></div>
  </div>
</section>
