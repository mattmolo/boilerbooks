<?php
	$title = 'Boiler Books';
	$committeeactive = "active";
	include '../menu.php';
?>

<form class="form-horizontal" action="selectcommittee.php" method="post">>
<fieldset>

<!-- Form Name -->
<legend></legend>

<div class="form-group">
  <label class="col-md-4 control-label" for="Committee">Committee</label>
  <div class="col-md-4">
    <select id="committee" name="committee" class="form-control">
      <option value="General IEEE">General IEEE</option>
	  <option value="Aerial Robotics">Aerial Robotics</option>
      <option value="Computer Society">Computer Society</option>
      <option value="EMBS">EMBS</option>
      <option value="Learning">Learning</option>
      <option value="Racing">Racing</option>
      <option value="ROV">ROV</option>
      <option value="Rocket">Rocket</option>
    </select>
  </div>
</div>


<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="submit"></label>
  <div class="col-md-4">
    <button id="submit" name="submit" class="btn btn-primary">Search</button>
  </div>
</div>

</fieldset>
</form>


<div class="container">
	<h3 class="text-center"><?php echo $_SESSION['committee'] ?> Expenses</h3>
	<table class="table">
		<thead>
			<tr>
				<th>Purchase Date</th>
				<th>Item</th>
				<th>Reason</th>
				<th>Vendor</th>
				<th>Purchased By</th>
				<th>Reviewed By</th>
				<th>Category</th>
				<th>Status</th>
				<th>Amount</th>
				<th>Comments</th>
			</tr>
		</thead>
		<tbody>
			<?php echo $_SESSION['commiteepurchases'] ?>
		</tbody>
	</table>
</div>



<?php
	include '../smallfooter.php';
?>
