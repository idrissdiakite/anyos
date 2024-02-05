{{--
Title: Map
Description: Une carte des implantations
Category: template-blocks
Icon: admin-multisite
Post-Type: page
Keywords: map
--}}

@php
  $data = Block::map($block['data']);
@endphp

<section class="b-map u-oh u-z2">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-10 offset-lg-2 col-xl-8">
        <div class="b-map__title">@include('elements/title', ['data' => $data['titles']])</div>
        <div class="b-map__wrapper u-df u-fdc u-aifs">
          @foreach ($data['cities'] as $city)
            <div class="b-map__city">
              <div class="b-map__city--name">{!! $city['name'] !!}</div>
              <div class="b-map__city--content">{!! $city['content'] !!}</div>
            </div>
          @endforeach
        </div>
      </div>
      <div class="col-lg-10 offset-lg-1 col-xl-11 offset-xl-2">
        <div class="b-map__image">@include('elements/image', ['data' => $data['image']])</div>
      </div>
    </div>
  </div>
</section>
