{{--
  Title: Texte mis en avant
  Description: Texte mis en avant
  Category: template-blocks
  Icon: editor-textcolor
  Post-Type: page
  Keywords: text featured
--}}

@php
  $data = Block::featuredText($block['data']);
@endphp

<section class="b-featured-text @if($data['is_round']){{'br'}}@endif u-bgg u-z2">
  @if(isset($data['button']))
    @if($data['button'] === "icon")
      <div class="b-featured-text__button--icon">
        @include('components/buttons/icon-button', ['bg' => 'grey-light', 'option' => 'border'])
      </div>
      @else
      <div class="b-featured-text__button--text">
        @include('components/buttons/text-button', ['bg' => 'grey-light', 'text' => 'Caractéristiques'])
      </div>
    @endif
  @endif
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-20 offset-lg-2 col-xl-16">
        <div class="b-featured-text__content">{!! wpautop($data['content']) !!}</div>
      </div>
    </div>
  </div>
</section>
