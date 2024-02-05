{{--
Title: Historique
Description: Historique de la société sous forme de modal
Category: template-blocks
Icon: editor-ol
Post-Type: page
Keywords: history modal
--}}

@php
$data = Block::history($block['data']);
@endphp

<section class="b-history u-padding u-bgb">
  @include('components/modal', ['data' => $data])
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-20 offset-lg-2">
        <div class="b-history__wrapper u-oh">
          <div class="b-history__image u-ca">@include('elements/image', ['data' => $data['image']])</div>
          <div class="b-history__content u-ca">
            <div class="b-history__title">@include('elements/title', ['data' => $data['titles']])</div>
            <div class="b-history__button e-button">
              <div class="e-button__title">Parcourir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
