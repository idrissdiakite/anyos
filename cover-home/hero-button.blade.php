<div class="c-hero-btn u-oh">
  <div class="c-hero-btn__shape">{!! display_svg('hero-btn') !!}</div>
  <div class="c-hero-btn__image">@include('elements/image', ['data' => $data])</div>
  <div class="c-hero-btn__square">
    <div class="c-hero-btn__square--wrapper">
      <span class="c-hero-btn__square--shape"></span>
      <span class="c-hero-btn__icon"><span>Découvrir</span>{!! display_svg('scroll') !!}</span>
    </div>
  </div>
</div>
