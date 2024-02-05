{{--
  Title: Cover home
  Description: Un contenu classique avec en fond une image ou une vidéo
  Category: template-blocks
  Icon: admin-home
  Post-Type: page
  Keywords: cover image video contenu home
--}}

@php
  $data = Block::coverHome($block['data']);
@endphp

<section class="b-cover-home @if($data['video']['video']){{ 'video '}}@endif">
  <div class="b-cover-home__wrapper">
    @if($data['video']['video'])
    <div class="b-cover-home__video">
      @include('components/cover-video', ['data' => $data['video']])
    </div>
    <div class="b-cover-home__image mobile">
      @include('elements/image', ['data' => $data['m_image']])
    </div>
    @else
    <div class="b-cover-home__image">
      @include('elements/image', ['data' => $data['image']])
    </div>
    @endif
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-20 offset-lg-2 col-xl-14">
          <div class="b-cover-home__content">
            @include('elements/title', ['data' => $data['titles']])
          </div>
        </div>
      </div>
    </div>
    <div class="b-cover-home__bottom">
      @include('components/hero-button', ['data' => $data['btn_image']])
    </div>
  </div>
</section>
